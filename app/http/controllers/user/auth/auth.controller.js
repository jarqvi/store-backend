const { UserModel } = require("../../../../models/users");
const { EXPIRES_IN, USER_ROLE } = require("../../../../utils/constans");
const { randomNumberGenerator, SignAccessToken } = require("../../../../utils/functions");
const { getOtpSchema, checkOtpSchema } = require("../../../validators/user/auth.schema")
const createError = require('http-errors');
const Controller = require("../../controller");

class UserAuthController extends Controller {
    async getOtp(req, res, next) {
        try {
            await getOtpSchema.validateAsync(req.body);
            const { mobile } = req.body;
            const code = randomNumberGenerator();
            const result = await this.saveUser(mobile, code);
            if (!result) throw createError.Unauthorized('Your login was failed.');
            return res.status(200).send({
                data: {
                    statusCode: 200,
                    message: 'OTP sent successfully.',
                    code,
                    mobile
                }
            });
        } catch (error) {
            next(error);
        }
    }
    async checkOtp(req, res, next) {
        try {
            await checkOtpSchema.validateAsync(req.body);
            const {mobile, code} = req.body;
            const user = await UserModel.findOne({mobile});
            if (!user) throw createError.NotFound('Mobile number not found.');
            if (user.otp.code != code) throw createError.Unauthorized('Your code is not valid.');
            const now = Date.now();
            if (+user.otp.expiresIn < now) throw createError.Unauthorized('Your code is expired.');
            const accessToken = await SignAccessToken(user._id);
            return res.json({
                data: {
                    accessToken,
                }
            });

        } catch (error) {
            next(error);
        }
    }
    async saveUser(mobile, code) {
        let otp = {
            code,
            expiresIn: EXPIRES_IN
        }
        const result = await this.checkExitsUser(mobile);
        if (result) {
            return await (this.updateUser(mobile, {otp}))
        }
        return !!(await UserModel.create({
            mobile,
            otp,
            Roles: [USER_ROLE]
        }));    
    }
    async checkExitsUser(mobile) {
        const user = await UserModel.findOne({ mobile });
        return !!user;
    }
    async updateUser(mobile, objectData = {}) {
        Object.keys(objectData).forEach(key => {
            if (['', ' ', 0, null, undefined, '0', NaN].includes(objectData[key])) delete objectData[key];
        });
        const updateResult = await UserModel.updateOne({mobile}, {$set: objectData});
        return !!updateResult.modifiedCount;
    }
}

module.exports = {
    UserAuthController: new UserAuthController()
}