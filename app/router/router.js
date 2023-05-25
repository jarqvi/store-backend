const router = require('express').Router();
const { AdminRoutes } = require('./admin/admin.routes');
const { HomeRoutes } = require('./api');
const { DeveloperRoutes } = require('./developer.routes');
const { UserAuthRoutes } = require('./user/auth');

router.use('/', HomeRoutes);
router.use('/user', UserAuthRoutes);
router.use('/developer', DeveloperRoutes);
router.use('/admin', AdminRoutes);

module.exports = {
    AllRoutes: router
}