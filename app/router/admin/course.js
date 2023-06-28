const { CourseController } = require('../../http/controllers/admin/course.controller');
const router = require('express').Router();

/**
 * @swagger
 *  /admin/courses/list:
 *      get:
 *          tags: [Course(AdminPanel)]
 *          summery: get all of courses
 *          parameters:
 *              -   in: query
 *                  name: search
 *                  type: string
 *                  description: search in title, shortText, text
 *          responses:
 *              200:
 *                  description: successfully
 */
router.get('/list', CourseController.getListOfProduct);
// router.post();
// router.put();
// router.put();
// router.delete();
// router.patch();
// router.get();

module.exports = {
    AdminApiCourseRouter: router
};