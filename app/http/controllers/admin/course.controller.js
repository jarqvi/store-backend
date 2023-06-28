const { CourseModel } = require("../../../models/course");
const Controller = require("../controller");
const {StatusCodes: HttpStatus} = require('http-status-codes');

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
}

module.exports = {
    CourseController: new CourseController()
};