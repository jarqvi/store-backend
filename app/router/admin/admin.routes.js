const { categoryRoutes } = require('./category');
const router = require('express').Router();

/**
 * @swagger
 *  tags:
 *      -   name: Admin-Panel
 *          description: Admin panel routes
 *      -   name: Category(AdminPanel)
 *          description: All methods and routes about category section
 *      
 */
router.use('/category', categoryRoutes);

module.exports = {
    AdminRoutes: router
};