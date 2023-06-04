const { AdminBlogController } = require('../../http/controllers/admin/blog.controller');

const router = require('express').Router();

/**
 * @swagger
 *  /admin/blogs:
 *      get:
 *          tags: [Blog(AdminPanel)]
 *          summery: get all blogs
 *          responses:
 *              200:
 *                  description: success - get all blogs
 */
router.get('/', AdminBlogController.getListOfBlog);
/**
 * @swagger
 *  /admin/blogs/add:
 *    post:
 *      tags: [Blog(AdminPanel)]
 *      summery: create new blog
 *      responses:
 *          201:
 *              description: success - create new blog
 */
router.post('/add', AdminBlogController.createBlog);


module.exports = {
    BlogAdminApiRoutes: router
};