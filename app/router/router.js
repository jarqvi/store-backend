const router = require('express').Router();
const { HomeRoutes } = require('./api');
const { UserAuthRoutes } = require('./user/auth');

router.use('/', HomeRoutes);
router.use('/user', UserAuthRoutes);

module.exports = {
    AllRoutes: router
}