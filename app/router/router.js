const router = require('express').Router();
const redisClient = require('../utils/init-redis');
const { HomeRoutes } = require('./api');
const { UserAuthRoutes } = require('./user/auth');

router.use('/', HomeRoutes);
router.use('/user', UserAuthRoutes);

module.exports = {
    AllRoutes: router
}