const createError = require('http-errors');
const { UserModel } = require('../../models/users');
const jwt = require('jsonwebtoken');
const { ACCESS_TOKEN_SECRET_KEY } = require('../../utils/constans');

function getToken(headers) {
    const [bearer, token] = headers?.['access-token']?.split(' ') || [];
    if (token && ['Bearer', 'bearer'].includes(bearer)) return token;
    throw crateError.Unauthorized('Your account was not found, log in to your account');
}
function verifyAccessToken(req, res, next) {
    try {
        const token = getToken(req.headers)
        jwt.verify(token, ACCESS_TOKEN_SECRET_KEY, async (err, payload) => {
            if (err) throw createError.Unauthorized('Log in to your account.');
            const {mobile} = payload || {};
            const user = await UserModel.findOne({mobile}, {password: 0, otp: 0});
            if (!user) throw createError.Unauthorized('User not found.');
            req.user = user;
            return next();
        });
    } catch (error) {
        next(error);
    }
}
function checkRole(role) {
    return function(req, res, next) {
        try {
            const user = req.user;
            if (user.roles.includes(role)) return next();
            throw createError.Forbidden('Access denied');
        } catch (error) {
            next(error);
        }
    }
}

module.exports = {
    verifyAccessToken,
    checkRole
};  