const createError = require('http-errors');
const { UserModel } = require('../../models/users');
const jwt = require('jsonwebtoken');
const { ACCESS_TOKEN_SECRET_KEY } = require('../../utils/constans');

function verifyAccessToken(req, res, next) {
    const headers = req.headers;
    const [bearer, token] = headers?.['access-token']?.split(' ') || [];
    if (token && ['Bearer', 'bearer'].includes(bearer)) {
        jwt.verify(token, ACCESS_TOKEN_SECRET_KEY, async (err, payload) => {
            if (err) return next(createError.Unauthorized('Log in to your account.'));
            const {mobile} = payload || {};
            const user = await UserModel.findOne({mobile}, {password: 0, otp: 0});
            if (!user) return next(createError.Unauthorized('User not found.'));
            req.user = user;
            return next();
        });
    } else {
        return next(createError.Unauthorized('Log in to your account.'));
    }
}

module.exports = {
    verifyAccessToken
};