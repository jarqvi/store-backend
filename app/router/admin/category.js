const { CategoryController } = require('../../http/controllers/admin/category.controller');
const router = require('express').Router();

/**
 * @swagger
 *  /admin/category/add:
 *      post:
 *          tags: [Category(AdminPanel)]
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
 *          tags: [Category(AdminPanel)]
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
 *          tags: [Category(AdminPanel)]
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
 *          tags: [Category(AdminPanel)]
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
 *          tags: [Category(AdminPanel)]
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
/**
 * @swagger
 *  /admin/category/list-of-all:
 *      get:
 *          tags: [Category(AdminPanel)]
 *          summery: Get all categories without populate
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
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *              -   in: formData
 *                  name: title
 *                  type: string
 *                  required: true
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