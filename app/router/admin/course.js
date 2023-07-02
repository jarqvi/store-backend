const { CourseController } = require('../../http/controllers/admin/course.controller');
const { stringToArray } = require('../../http/middlewares/stringToArray');
const router = require('express').Router();
const { uploadFile } = require('../../utils/multer');


router.get('/list', CourseController.getListOfCourse);
router.post('/add', uploadFile.single('image'), stringToArray('tags'), CourseController.addCourse);   
router.put('/chapter', CourseController.addChapter);
router.get('/chapter-list/:id', CourseController.getChaptersOfCourse);
router.put('/update-chapter/:id', CourseController.updateChapter);
router.patch('/remove-chapter/:id', CourseController.removeChapter);
// router.delete();
router.get('/:id', CourseController.getCourseById);


module.exports = {
    AdminApiCourseRouter: router
};