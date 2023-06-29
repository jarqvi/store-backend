const { CourseController } = require('../../http/controllers/admin/course.controller');
const { stringToArray } = require('../../http/middlewares/stringToArray');
const router = require('express').Router();
const { uploadFile } = require('../../utils/multer');


/**
 * @swagger
 *  components:
 *      schemas:
 *          Types:
 *              type: string
 *              enum:
 *                  -   free
 *                  -   cash
 *                  -   special
 *          Course:
 *              type: object
 *              required:
 *                  -   title
 *                  -   shortText
 *                  -   text
 *                  -   tags
 *                  -   category
 *                  -   price
 *                  -   discount
 *                  -   image
 *                  -   type
 *              properties:
 *                  title:
 *                      type: string
 *                      description: title of the course
 *                  shortText:
 *                      type: string
 *                      description: shortText of the course
 *                  text:
 *                      type: string
 *                      description: text of the course
 *                  tags:
 *                      type: array
 *                      description: tags of the course
 *                  category:
 *                      type: string
 *                      description: category of the course
 *                  price:
 *                      type: string
 *                      description: price of the course
 *                  discount:
 *                      type: string
 *                      description: discount of the course
 *                  image:
 *                      type: string
 *                      format: binary
 *                  type: 
 *                      $ref: '#/components/schemas/Types'
 *                      
 */


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
/**
 * @swagger
 *  /admin/courses/add:
 *      post:
 *          tags: [Course(AdminPanel)]
 *          summary: Add new course
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/Course'
 *          responses:
 *              201:
 *                  description: The product was successfully added
 */
router.post('/add', uploadFile.single('image'), stringToArray('tags'), CourseController.addCourse);   
// router.put();
// router.put();
// router.delete();
// router.patch();
// router.get();

module.exports = {
    AdminApiCourseRouter: router
};