const { CourseModel } = require("../../../models/course");
const { createCourseSchema } = require("../../validators/admin/course.schema");
const Controller = require("../controller");
const {StatusCodes: HttpStatus} = require('http-status-codes');
const path = require('path');
const createError = require('http-errors');

class CourseController extends Controller {
    async getListOfProduct(req, res, next) {
        try {
            const search = req.query.search || '';
            let courses;
            if(search) {
                courses = await CourseModel.find({$text: {$search: search}}).sort({_id: -1});
            } else {
                courses = await CourseModel.find({}).sort({_id: -1});
            }
            return res.status(HttpStatus.OK).json({
                data: {
                    statusCode: HttpStatus.OK,
                    courses
                }
            });
        } catch (error) {
            next(error);
        }
    }
    async addCourse(req, res, next) {
        try {
            await createCourseSchema.validateAsync(req.body);
            const {fileUploadPath, fileName} = req.body;
            const image = path.join(fileUploadPath, fileName).replace(/\\/g, '/');
            const {title, shortText, text, tags, category, price, discount, type} = req.body;
            if (Number(price) > 0 && type === 'free') throw createError.BadRequest('No price can be registered for the free course');
            const course = await CourseModel.create({
                title, shortText, text, tags, category, price, discount, image, type,
                time: '00:00:00',
                status: 'notStarted',
                teacher: req.user._id
            });
            if (!course._id) throw createError.InternalServerError('Course not created');
            return res.status(HttpStatus.CREATED).json({
                statusCode: HttpStatus.CREATED,
                message: 'Course created successfully'
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = {
    CourseController: new CourseController()
};