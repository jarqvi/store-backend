const { AdminBlogController } = require('../../http/controllers/admin/blog.controller');
const { stringToArray } = require('../../http/middlewares/stringToArray');
const { uploadFile } = require('../../utils/multer');
const router = require('express').Router();


router.get('/', AdminBlogController.getListOfBlog);
router.post('/add', uploadFile.single('image'), stringToArray('tags'), AdminBlogController.createBlog);
router.get('/:id', AdminBlogController.getOneBlogById);
router.delete('/remove/:id', AdminBlogController.deleteBlogById);
router.patch('/update/:id', uploadFile.single('image'), stringToArray('tags'), AdminBlogController.updateBlogById);


module.exports = {
    BlogAdminApiRoutes: router
};