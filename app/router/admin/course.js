const { CourseController } = require('../../http/controllers/admin/course.controller');
const { stringToArray } = require('../../http/middlewares/stringToArray');
const router = require('express').Router();
const { uploadFile } = require('../../utils/multer');


router.get('/list', CourseController.getListOfProduct);
router.post('/add', uploadFile.single('image'), stringToArray('tags'), CourseController.addCourse);   
router.put('/chapter', CourseController.addChapter);
router.get('/chapter-list/:id', CourseController.getChaptersOfCourse);
// router.put();
// router.delete();
// router.patch();
router.get('/:id', CourseController.getCourseById);


module.exports = {
    AdminApiCourseRouter: router
};