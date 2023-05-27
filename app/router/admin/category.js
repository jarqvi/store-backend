const { CategoryController } = require('../../http/controllers/admin/category.controller');
const router = require('express').Router();

/**
 * @swagger
 *  /admin/category/add:
 *      post:
 *          tags: [Admin-Panel]
 *          summery: Create new category title
 *          parameters:
 *              -   in: formData
 *                  name: title
 *                  type: string
 *                  required: true
 *              -   in: formData
 *                  name: parent
 *                  type: string
 *                  required: false
 *          responses:
 *              201:
 *                  description: Success
 */
router.post('/add', CategoryController.addCategory);
/**
 * @swagger
 *  /admin/category/parents:
 *      get:
 *          tags: [Admin-Panel]
 *          summery: Get all parent categories
 *          responses:
 *              200:
 *                  description: Success
 */
router.get('/parents', CategoryController.getAllParents);
/**
 * @swagger
 *  /admin/category/children/{parent}:
 *      get:
 *          tags: [Admin-Panel]
 *          summery: Get all child categories
 *          parameters:
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
 *          tags: [Admin-Panel]
 *          summery: Get all categories
 *          responses:
 *              200:
 *                  description: Success
 */
router.get('/all', CategoryController.getAllCategory);
/**
 * @swagger
 *  /admin/category/delete/{id}:
 *      delete:
 *          tags: [Admin-Panel]
 *          summery: Delete category by id
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          responses:
 *              202:
 *                  description: Success
 */
router.delete('/delete/:id', CategoryController.removeCategory);

module.exports = {
    categoryRoutes: router
};