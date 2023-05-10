const router = require('express').Router();
const { HomeRoutes } = require('./api');

router.use('/', HomeRoutes);

module.exports = {
    AllRoutes: router
}