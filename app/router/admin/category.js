const { CategoryController } = require('../../http/controllers/admin/category.controller');
const router = require('express').Router();


router.post('/add', CategoryController.addCategory);
router.get('/parents', CategoryController.getAllParents);
router.get('/children/:parent', CategoryController.getChildOfParents);
router.get('/all', CategoryController.getAllCategory);
router.delete('/delete/:id', CategoryController.removeCategory);
router.get('/list-of-all', CategoryController.getAllCategoryWithoutPopulate);
router.patch('/update/:id', CategoryController.editCategory);
router.get('/:id', CategoryController.getCategoryById);


module.exports = {
    categoryRoutes: router
};