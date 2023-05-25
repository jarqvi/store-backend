const { UserAuthController } = require('../../http/controllers/user/auth/auth.controller');
const router = require('express').Router();

/**
 * @swagger
 * tags:
 *  name: User-Auth
 *  description: Login user section
 */

/**
 * @swagger
 * /user/get-otp:
 *      post:
 *          summary: User Login
 *          tags: [User-Auth]
 *          description: Login user in user panel with phone number and one time password(OTP) 
 *          parameters:
 *          -   name: mobile
 *              description: fa-IRI mobile number
 *              in: formData
 *              required: true
 *              type: string
 *          responses:
 *              201:
 *                  description: User login successfully
 *              400:
 *                  description: Bad request
 *              401:
 *                  description: Unauthorized
 *              500:
 *                  description: Internal server error
 */

router.post('/get-otp', UserAuthController.getOtp);
/**
 * @swagger
 *  /user/check-otp:
 *      post:
 *          summary: User Login
 *          tags: [User-Auth]
 *          description: Login user in user panel with phone number and one time password(OTP)
 *          parameters:
 *          -   name: mobile
 *              description: fa-IRI mobile number
 *              in: formData
 *              required: true
 *              type: string
 *          -   name: code
 *              description: enter sms code received on your mobile
 *              in: formData
 *              required: true
 *              type: string
 *          responses:
 *              201:
 *                  description: User login successfully
 *              400:
 *                  description: Bad request
 *              401:
 *                  description: Unauthorized
 *              500:
 *                  description: Internal server error
 *          
 */
router.post('/check-otp', UserAuthController.checkOtp);
/**
 * @swagger
 *  /user/refresh-token:
 *      post:
 *          summary: Refresh token
 *          tags: [User-Auth]
 *          description: Send refresh token to get new access token
 *          parameters:
 *          -   in: formData
 *              required: true
 *              type: string
 *              name: refreshToken
 *          responses:
 *              200:
 *                  description: Successfully    
 */
router.post('/refresh-token', UserAuthController.refreshToken);

module.exports = {
    UserAuthRoutes: router
};