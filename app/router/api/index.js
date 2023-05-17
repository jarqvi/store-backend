const homeController = require('../../http/controllers/api/home.controller');
const { verifyAccessToken } = require('../../http/middlewares/verifyAccessToken');
const router = require('express').Router();
/**
 * @swagger
 * tags:
 *  name: Home
 *  description: This is Home Page
 */
/**
 * @swagger
 * /:
 *  get:
 *      summary: This is Home Page
 *      tags: [Home]
 *      description: Get all need data for index page
 *      parameters:
 *          - in: header
 *            name: access-token
 *            example: Bearer <access_token>
 *      responses:
 *          200:
 *              description: Success
 *          404:
 *             description: Not Found
 */

router.get('/', verifyAccessToken, homeController.indexPage);

module.exports = {
    HomeRoutes: router
};