const { BlogAdminApiRoutes } = require('./blog');
const { categoryRoutes } = require('./category');
const router = require('express').Router();

/**
 * @swagger
 *  tags:
 *      -   name: Admin-Panel
 *          description: Admin panel routes
 *      -   name: Category(AdminPanel)
 *          description: All methods and routes about category section
 *      -   name: Blog(AdminPanel)
 *          description: All methods and routes about blog section
 *      
 */
router.use('/category', categoryRoutes);
router.use('/blogs', BlogAdminApiRoutes);

module.exports = {
    AdminRoutes: router
};