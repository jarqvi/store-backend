const homeController = require('../../http/controllers/api/home.controller');
const { verifyAccessToken } = require('../../http/middlewares/verifyAccessToken');
const router = require('express').Router();


router.get('/', verifyAccessToken, homeController.indexPage);


module.exports = {
    HomeRoutes: router
};