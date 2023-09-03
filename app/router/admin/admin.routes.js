const { verifyAccessToken } = require('../../http/middlewares/verifyAccessToken');
const { BlogAdminApiRoutes } = require('./blog');
const { categoryRoutes } = require('./category');
const { AdminApiCourseRouter } = require('./course');
const { AdminApiProductRouter } = require('./product');
const router = require('express').Router();

/**
 * @swagger
 *  tags:
 *      -   name: Admin-Panel
 *          description: Admin panel routes
 *      -   name: Course(AdminPanel)
 *          description: All methods and routes about course section
 *      -   name: Category(AdminPanel)
 *          description: All methods and routes about category section
 *      -   name: Blog(AdminPanel)
 *          description: All methods and routes about blog section
 *      -   name: Products(AdminPanel)
 *          description: All methods and routes about products section
 *      
 */
router.use('/category', categoryRoutes);
router.use('/blogs', BlogAdminApiRoutes);
router.use('/products', AdminApiProductRouter);
router.use('/courses', AdminApiCourseRouter);

module.exports = {
    AdminRoutes: router
};