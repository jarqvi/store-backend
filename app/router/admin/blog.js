const { AdminBlogController } = require('../../http/controllers/admin/blog.controller');
const { stringToArray } = require('../../http/middlewares/stringToArray');
const { uploadFile } = require('../../utils/multer');

const router = require('express').Router();

// /**
//  * @swagger
//  *  components:
//  *      schemas:
//  *          AddBlog:
//  *              type: object
//  *              required:
//  *                  -   mobile
//  *              properties:
//  *                  mobile:
//  *                      type: string
//  *                      description: fa-IRI mobile number for login and register
//  *          UpdateBlog:
//  *              type: object
//  *              required:
//  *                  -   mobile  
//  *                  -   code
//  *              properties:
//  *                  mobile:
//  *                      type: string
//  *                      description: fa-IRI mobile number for login and register
//  *                  code:
//  *                      type: integer
//  *                      description: enter sms code received on your mobile         
//  */

/**
 * @swagger
 *  /admin/blogs:
 *      get:
 *          tags: [Blog(AdminPanel)]
 *          summery: get all blogs
 *          parameters:
 *              -   in: header
 *                  example: Bearer access-token
 *                  name: access-token
 *                  type: string
 *                  required: true
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
 *      consumes:
 *          - multipart/form-data
 *      parameters:
 *          -   in: header
 *              example: Bearer access-token
 *              name: access-token
 *              type: string
 *              required: true
 *          -   in: formData
 *              name: title
 *              required: true
 *              type: string
 *          -   in: formData
 *              name: text
 *              required: true
 *              type: string
 *          -   in: formData
 *              name: shortText
 *              required: true
 *              type: string
 *          -   in: formData
 *              name: tags
 *              example: tag-1#tag-2#tag-3 || str || undefined
 *              type: string
 *          -   in: formData
 *              name: category
 *              required: true
 *              type: string
 *          -   in: formData
 *              name: image
 *              required: true
 *              type: file
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
 *              -   in: header
 *                  example: Bearer access-token
 *                  name: access-token
 *                  type: string
 *                  required: true
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
 *              -   in: header
 *                  example: Bearer access-token
 *                  name: access-token
 *                  type: string
 *                  required: true
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
 *          -   in: header
 *              example: Bearer access-token
 *              name: access-token
 *              type: string
 *              required: true
 *          -   in: path
 *              name: id
 *              type: string
 *              required: true
 *          -   in: formData
 *              name: title
 *              type: string
 *          -   in: formData
 *              name: text
 *              type: string
 *          -   in: formData
 *              name: shortText
 *              type: string
 *          -   in: formData
 *              name: tags
 *              example: tag-1#tag-2#tag-3 || str || undefined
 *              type: string
 *          -   in: formData
 *              name: category
 *              type: string
 *          -   in: formData
 *              name: image
 *              type: file
 *      responses:
 *          201:
 *              description: success - update blog by id
 */
router.patch('/update/:id', uploadFile.single('image'), stringToArray('tags'), AdminBlogController.updateBlogById);


module.exports = {
    BlogAdminApiRoutes: router
};