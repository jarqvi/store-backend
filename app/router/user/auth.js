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
 * /user/login:
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

router.post('/login', UserAuthController.login)

module.exports = {
    UserAuthRoutes: router
};