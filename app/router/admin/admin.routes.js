const { categoryRoutes } = require('./category');
const router = require('express').Router();

/**
 * @swagger
 *  tags:
 *      name: Admin-Panel
 *      description: Admin panel routes
 *      
 */
router.use('/category', categoryRoutes);

module.exports = {
    AdminRoutes: router
};