const { AdminBlogController } = require('../../http/controllers/admin/blog.controller');
const { stringToArray } = require('../../http/middlewares/stringToArray');
const { uploadFile } = require('../../utils/multer');

const router = require('express').Router();

/**
 * @swagger
 *  components:
 *      schemas:
 *          AddBlog:
 *              type: object
 *              required:
 *                  -   title
 *                  -   text
 *                  -   shortText
 *                  -   tags
 *                  -   category
 *                  -   image
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of blog
 *                  text:
 *                      type: string
 *                      description: the text of blog
 *                  shortText:
 *                      type: string
 *                      description: the shortText of blog
 *                  tags:
 *                      type: string
 *                      description: the tags of blog 
 *                  category:
 *                      type: string
 *                      description: the category id of blog
 *                  image:
 *                      type: file
 *                      description: the image of blog
 *          UpdateBlog:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of blog
 *                  text:
 *                      type: string
 *                      description: the text of blog
 *                  shortText:
 *                      type: string
 *                      description: the shortText of blog
 *                  tags:
 *                      type: string
 *                      description: the tags of blog 
 *                  category:
 *                      type: string
 *                      description: the category id of blog
 *                  image:
 *                      type: file
 *                      description: the image of blog         
 */

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
 *      requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/AddBlog'
 *      responses:
 *          201:
 *              description: success - create new blog
 */
router.post('/add', uploadFile.single('image'), stringToArray('tags'), AdminBlogController.createBlog);
/**
 * @swagger
 *  /admin/blogs/{id}:
 *      get:
 *          tags: [Blog(AdminPanel)]
 *          summery: get one blog by id
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: success - get one blog by id
 */
router.get('/:id', AdminBlogController.getOneBlogById);
/**
 * @swagger
 *  /admin/blogs/remove/{id}:
 *      delete:
 *          tags: [Blog(AdminPanel)]
 *          summery: delete blog by id
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: success - delete blog by id
 */
router.delete('/remove/:id', AdminBlogController.deleteBlogById);
/**
 * @swagger
 *  /admin/blogs/update/{id}:
 *    patch:
 *      tags: [Blog(AdminPanel)]
 *      summery: update blog by id
 *      consumes:
 *          - multipart/form-data
 *      parameters:
 *          -   in: path
 *              name: id
 *              type: string
 *              required: true
 *      requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/UpdateBlog'
 *      responses:
 *          201:
 *              description: success - update blog by id
 */
router.patch('/update/:id', uploadFile.single('image'), stringToArray('tags'), AdminBlogController.updateBlogById);


module.exports = {
    BlogAdminApiRoutes: router
};