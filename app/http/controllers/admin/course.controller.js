const { CourseModel } = require("../../../models/course");
const { createCourseSchema } = require("../../validators/admin/course.schema");
const Controller = require("../controller");
const {StatusCodes: HttpStatus} = require('http-status-codes');
const path = require('path');
const createError = require('http-errors');
const { default: mongoose } = require("mongoose");

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
    async getCourseById(req, res, next) {
        try {
            const {id} = req.params;
            const course = await CourseModel.findById(id);
            if (!course) throw createError.NotFound('Not found course');
            return res.status(HttpStatus.OK).json({
                data: {
                    statusCode: HttpStatus.OK,
                    course
                }
            });
        } catch (error) {
            next(error);
        }
    }
    async addChapter(req, res, next) {
        try {
            const {id, title, text} = req.body;
            if (!mongoose.isValidObjectId(id)) throw createError.BadRequest('Invalid id');
            const course = await CourseModel.findById(id);
            if (!course) throw createError.NotFound('Not found course');
            const result = await CourseModel.updateOne({_id: id}, {$push: {
                chapters: {title, text, episodes: []}
            }});
            if (result.modifiedCount === 0) throw createError.InternalServerError('Chapter not created');
            return res.status(HttpStatus.CREATED).json({
                statusCode: HttpStatus.CREATED,
                data: {
                    message: 'Chapter created successfully'
                }
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = {
    CourseController: new CourseController()
};