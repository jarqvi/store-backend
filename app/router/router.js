const router = require('express').Router();
const { HomeRoutes } = require('./api');
const { DeveloperRoutes } = require('./developer.routes');
const { UserAuthRoutes } = require('./user/auth');

router.use('/', HomeRoutes);
router.use('/user', UserAuthRoutes);
router.use('/developer', DeveloperRoutes);

module.exports = {
    AllRoutes: router
}