const homeController = require('../../http/controllers/api/home.controller');
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
 *      responses:
 *          200:
 *              description: Success
 *          404:
 *             description: Not Found
 */

router.get('/', homeController.indexPage);

module.exports = {
    HomeRoutes: router
};