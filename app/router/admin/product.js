const { ProductController } = require('../../http/controllers/admin/product.controller');
const { stringToArray } = require('../../http/middlewares/stringToArray');
const { uploadFile } = require('../../utils/multer');
const router = require('express').Router();


router.get('/list', ProductController.getAllProducts);
router.get('/:id', ProductController.getOneProduct);
router.delete('/remove/:id', ProductController.removeProduct);
router.post('/add', uploadFile.array('images', 10), stringToArray('tags'), ProductController.addProduct);
router.patch('/edit/:id', uploadFile.array('images', 10), stringToArray('tags'), ProductController.editProduct);


module.exports = {
    AdminApiProductRouter: router
};