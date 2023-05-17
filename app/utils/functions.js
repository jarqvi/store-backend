const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const { UserModel } = require('../models/users');
const { ACCESS_TOKEN_SECRET_KEY, REFRESH_TOKEN_SECRET_KEY } = require('./constans');

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
        jwt.sign(payload, REFRESH_TOKEN_SECRET_KEY, options, (err, token) => {
            if (err) reject(createError.InternalServerError('Internal server error.'));
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
            resolve(mobile);
        });
    });
}

module.exports = {
    randomNumberGenerator,
    SignAccessToken,
    SignRefreshToken,
    verifyRefreshToken
}