const { CategoryController } = require('../../http/controllers/admin/category.controller');
const router = require('express').Router();

/**
 * @swagger
 *  components:
 *      schemas:
 *          CreateCategory:
 *              type: object
 *              required:
 *                  -   title
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of category
 *                  parent:
 *                      type: string
 *                      description: the parent of category
 *          UpdateCategory:
 *              type: object
 *              required:
 *                  -   title
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of category         
 */

/**
 * @swagger
 *  /admin/category/add:
 *      post:
 *          tags: [Category(AdminPanel)]
 *          summery: Create new category title
 *          parameters:
 *              -   in: header
 *                  example: Bearer access-token
 *                  name: access-token
 *                  type: string
 *                  required: true
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/CreateCategory'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/CreateCategory'
 *          responses:
 *              201:
 *                  description: Success
 */
router.post('/add', CategoryController.addCategory);
/**
 * @swagger
 *  /admin/category/parents:
 *      get:
 *          tags: [Category(AdminPanel)]
 *          summery: Get all parent categories
 *          parameters:
 *              -   in: header
 *                  example: Bearer access-token
 *                  name: access-token
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: Success
 */
router.get('/parents', CategoryController.getAllParents);
/**
 * @swagger
 *  /admin/category/children/{parent}:
 *      get:
 *          tags: [Category(AdminPanel)]
 *          summery: Get all child categories
 *          parameters:
 *              -   in: header
 *                  example: Bearer access-token
 *                  name: access-token
 *                  type: string
 *                  required: true
 *              -   in: path
 *                  name: parent
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: Success
 */
router.get('/children/:parent', CategoryController.getChildOfParents);
/**
 * @swagger
 *  /admin/category/all:
 *      get:
 *          tags: [Category(AdminPanel)]
 *          summery: Get all categories
 *          parameters:
 *              -   in: header
 *                  example: Bearer access-token
 *                  name: access-token
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: Success
 */
router.get('/all', CategoryController.getAllCategory);
/**
 * @swagger
 *  /admin/category/delete/{id}:
 *      delete:
 *          tags: [Category(AdminPanel)]
 *          summery: Delete category by id
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
 *              202:
 *                  description: Success
 */
router.delete('/delete/:id', CategoryController.removeCategory);
/**
 * @swagger
 *  /admin/category/list-of-all:
 *      get:
 *          tags: [Category(AdminPanel)]
 *          summery: Get all categories without populate
 *          parameters:
 *              -   in: header
 *                  example: Bearer access-token
 *                  name: access-token
 *                  type: string
 *                  required: true
 *          responses:
 *              202:
 *                  description: Success
 */
router.get('/list-of-all', CategoryController.getAllCategoryWithoutPopulate);
/**
 * @swagger
 *  /admin/category/update/{id}:
 *      patch:
 *          tags: [Category(AdminPanel)]
 *          summery: Edit or update category title
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
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/UpdateCategory'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/UpdateCategory'         
 *          responses:
 *              202:
 *                  description: Success
 *              500:
 *                  description: Internal server error
 */
router.patch('/update/:id', CategoryController.editCategory);
/**
 * @swagger
 *  /admin/category/{id}:
 *      get:
 *          tags: [Category(AdminPanel)]
 *          summery: Get category by id
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
 *              202:
 *                  description: Success
 */
router.get('/:id', CategoryController.getCategoryById);

module.exports = {
    categoryRoutes: router
};