const { UserAuthController } = require('../../http/controllers/user/auth/auth.controller');
const router = require('express').Router();

/**
 * @swagger
 *  components:
 *      schemas:
 *          GetOTP:
 *              type: object
 *              required:
 *                  -   mobile
 *              properties:
 *                  mobile:
 *                      type: string
 *                      description: fa-IRI mobile number for login and register
 *          CheckOTP:
 *              type: object
 *              required:
 *                  -   mobile  
 *                  -   code
 *              properties:
 *                  mobile:
 *                      type: string
 *                      description: fa-IRI mobile number for login and register
 *                  code:
 *                      type: integer
 *                      description: enter sms code received on your mobile
 *          RefreshToken:
 *              type: object
 *              required:
 *                  -   refreshToken
 *              properties:
 *                  refreshToken:
 *                      type: string
 *                      description: refresh token for receive new access token          
 */

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
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/GetOTP'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/GetOTP'
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
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/CheckOTP'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/CheckOTP'
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
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/RefreshToken'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/RefreshToken'
 *          responses:
 *              200:
 *                  description: Successfully    
 */
router.post('/refresh-token', UserAuthController.refreshToken);

module.exports = {
    UserAuthRoutes: router
};