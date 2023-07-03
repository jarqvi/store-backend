const { CourseModel } = require("../../../models/course");
const { createCourseSchema, createEpisodeSchema } = require("../../validators/admin/course.schema");
const Controller = require("../controller");
const {StatusCodes: HttpStatus} = require('http-status-codes');
const path = require('path');
const createError = require('http-errors');
const { default: mongoose } = require("mongoose");
const { getVideoDurationInSeconds } = require('get-video-duration')
const { getTime } = require("../../../utils/functions");

class CourseController extends Controller {
    async getListOfCourse(req, res, next) {
        try {
            const search = req.query.search || '';
            let courses;
            if(search) {
                courses = await CourseModel.find({$text: {$search: search}})
                .populate([
                    {path: 'category', select: {children: 0, parent: 0}},
                    {path: 'teacher', select: {first_name: 1, last_name: 1, mobile: 1, email: 1}},
                ])
                .sort({_id: -1});
            } else {
                courses = await CourseModel.find({})
                .populate([
                    {path: 'category', select: {children: 0, parent: 0}},
                    {path: 'teacher', select: {first_name: 1, last_name: 1, mobile: 1, email: 1}},
                ])
                .sort({_id: -1});
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
    async getChaptersOfCourse(req, res, next) {
        try {
            const {id} = req.params;
            const chapters = await CourseModel.findById(id, {chapters: 1, title: 1});
            if (!chapters) throw createError.NotFound('Not found course');
            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                data: {
                    chapters
                }
            });
        } catch (error) {
            next(error);
        }
    }
    async removeChapter(req, res, next) {
        try {
            const {id} = req.params;
            const chapter = await CourseModel.findOne({'chapters._id': id}, {'chapters.$': 1});
            if (!chapter) throw createError.NotFound('Not found chapter');
            const result = await CourseModel.updateOne({'chapters._id': id}, {$pull: {
                chapters: {_id: id}
            }});
            if (result.modifiedCount === 0) throw createError.InternalServerError('Chapter not deleted');
            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                data: {
                    message: 'Chapter deleted successfully'
                }
            });
        } catch (error) {
            next(error);
        }
    }
    async updateChapter(req, res, next) {
        try {
            const {id} = req.params;
            const data = req.body;
            let blackList = [undefined, null, 0, '0', ' ', ''];
            Object.keys(data).forEach(key => {
                if ('_id'.includes(data[key])) delete data[key];
                if (typeof data[key] == 'string') data[key] = data[key].trim();
                if (Array.isArray(data[key]) && data[key].length > 0) data[key] = data[key].map(item => item.trim());
                if (Array.isArray(data[key]) && data[key].length == 0) delete data[key];
                if (blackList.includes(data[key])) delete data[key];
            });
            const chapter = await CourseModel.findOne({'chapters._id': id}, {'chapters.$': 1});
            if (!chapter) throw createError.NotFound('Not found chapter');
            const result = await CourseModel.updateOne(
                {'chapters._id': id},
                {$set: {'chapters.$': data}}
            );
            if (result.modifiedCount === 0) throw createError.InternalServerError('Chapter not updated');
            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                data: {
                    message: 'Chapter updated successfully'
                }
            })
        } catch (error) {
            next(error);
        }
    }
    async addEpisode(req, res, next) {
        try {
            let {type, title, text, chapterId, courseId, fileName, fileUploadPath} = await createEpisodeSchema.validateAsync(req.body);
            fileUploadPath = fileUploadPath.replace(/\\/g, '/');
            const videoAdd = path.join(fileUploadPath, fileName).replace(/\\/g, '/');
            const videoUrl = `http://localhost:3000/${videoAdd}`;
            const seconds = await getVideoDurationInSeconds(videoUrl);
            const time = getTime(seconds);
            const createEpisode = await CourseModel.updateOne({_id: courseId, 'chapters._id': chapterId}, {
                $push: {
                    'chapters.$.episodes': {title, text, type, videoAdd, time}
                }
            });
            if (createEpisode.modifiedCount === 0) throw createError.InternalServerError('Episode not created');
            return res.status(HttpStatus.CREATED).json({
                statusCode: HttpStatus.CREATED,
                data: {
                    message: 'Episode created successfully'
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