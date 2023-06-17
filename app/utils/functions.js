const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const { UserModel } = require('../models/users');
const { ACCESS_TOKEN_SECRET_KEY, REFRESH_TOKEN_SECRET_KEY } = require('./constans');
const redisClient = require('./init-redis');
const fs = require('fs');
const path = require('path');

function randomNumberGenerator() {
    return Math.floor(Math.random() * (99999 - 10000)) + 10000;
}

function SignAccessToken(userId) {
    return new Promise(async (resolve, reject) => {
        const user = await  UserModel.findById(userId);
        const payload = {
            mobile: user.mobile
        };
        const options = {
            expiresIn: '1h',
        };
        jwt.sign(payload, ACCESS_TOKEN_SECRET_KEY, options, (err, token) => {
            if (err) reject(createError.InternalServerError('Internal server error.'));
            resolve(token);
        });
    });
}

function SignRefreshToken(userId) {
    return new Promise(async (resolve, reject) => {
        const user = await  UserModel.findById(userId);
        const payload = {
            mobile: user.mobile
        };
        const options = {
            expiresIn: '1y',
        };
        jwt.sign(payload, REFRESH_TOKEN_SECRET_KEY, options, async (err, token) => {
            if (err) reject(createError.InternalServerError('Internal server error.'));
            await redisClient.SETEX(String(userId), (365 * 24 * 60 * 60), token);
            resolve(token);
        });
    });
}

function verifyRefreshToken(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, REFRESH_TOKEN_SECRET_KEY, async (err, payload) => {
            if (err) reject(createError.Unauthorized('Log in to your account.'));
            const {mobile} = payload || {};
            const user = await UserModel.findOne({mobile}, {password: 0, otp: 0});
            if (!user) reject(createError.Unauthorized('User not found.'));
            const refreshToken = await redisClient.get(String(user?._id));
            if (!refreshToken) reject(createError.Unauthorized("Failed to re-login to a user account"))
            if (token === refreshToken) return resolve(mobile);
            reject(createError.Unauthorized("Failed to re-login to a user account"))
        });
    });
}

function deleteFileInPublic(fileAddress) {
    if (fileAddress) {
        const pathFile = path.join(__dirname, '../../public', fileAddress);
        if (fs.existsSync(pathFile)) fs.unlinkSync(pathFile);
    } 
}

function listOfImages(files, fileUploadPath) {
    if (files?.length > 0) {
        return ((files.map(file => path.join(fileUploadPath, file.filename))).map(item => item.replace(/\\/g, '/')));
    } else {
        return [];
    }
}

function copyObj(obj) {
    return JSON.parse(JSON.stringify(obj));
}

function setFeatures(body) {
    const {width, length, height, weight} = body;
    let feature = {}, type = 'real';
    if (width || length || height || weight) {
        if (!width) feature.width = 0;
        else feature.width = width;
        if (!length) feature.length = 0;
        else feature.length = length;
        if (!weight) feature.weight = 0;
        else feature.weight = weight;
        if (!height) feature.height = 0;
        else feature.height = height;
    } else {
        type = 'virtual';
    }
    return {feature, type};
}

module.exports = {
    randomNumberGenerator,
    SignAccessToken,
    SignRefreshToken,
    verifyRefreshToken,
    deleteFileInPublic,
    listOfImages,
    copyObj,
    setFeatures
}