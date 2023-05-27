const { CategoryModel } = require("../../../models/categories");
const { addCategorySchema } = require("../../validators/admin/category.schema");
const Controller = require("../controller");
const createError = require("http-errors");

class CategoryController extends Controller {
    async checkExistCategory(id) {
        const category = await CategoryModel.findById(id);
        if (!category) throw createError.NotFound('Category not found.');
        return category;
    }
    async addCategory(req, res, next) {
        try {
            await addCategorySchema.validateAsync(req.body);
            const {title, parent} = req.body;
            const category = await CategoryModel.create({title, parent});
            if (!category) throw createError.InternalServerError('Internal Server Error');
            return res.status(201).json({
                data: {
                    statusCode: 201,
                    message: 'Category created successfully',
                }
            });
        } catch (error) {
            next(error);
        }
    }
    editCategory(req, res, next) {
        try {
            
        } catch (error) {
            next(error);
        }
    }
    async removeCategory(req, res, next) {
        try {
            const {id} = req.params;
            const category = await this.checkExistCategory(id);
            const deleteResult = await CategoryModel.deleteOne({_id: category._id});
            if (deleteResult.deletedCount == 0) throw createError.InternalServerError('Server error.');
            return res.status(202).json({
                data: {
                    statusCode: 202,
                    message: 'Category deleted.'
                }
            });
        } catch (error) {
            next(error);
        }
    }
    async getAllCategory(req, res, next) {
        try {
            const categories = await CategoryModel.aggregate([
                {
                    $lookup: {
                        from: 'categories',
                        localField: '_id',
                        foreignField: 'parent',
                        as: 'children'
                    }
                }, {
                    $project: {
                        __v: 0,
                        'children.__v': 0,
                        'children.parent': 0
                    }
                }
            ]);
            return res.status(200).json({
                data: {
                    statusCode: 200,
                    message: 'Success',
                    categories
                }
                
            });
        } catch (error) {
            next(error);
        }
    }
    getCategoryById(req, res, next) {
        try {
            
        } catch (error) {
            next(error);
        }
    }
    async getAllParents(req, res, next) {
        try {
            const parents = await CategoryModel.find({parent: undefined}, {__v: 0});
            return res.status(200).json({
                data: {
                    statusCode: 200,
                    message: 'Success',
                    parents
                }
            });
        } catch (error) {
            next(error);
        }
    } 
    async getChildOfParents(req, res, next) {
        try {
            const { parent } = req.params;
            const children = await CategoryModel.find({parent}, {__v: 0, parent: 0});
            return res.status(200).json({
                data: {
                    statusCode: 200,
                    message: 'Success',
                    children
                }
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = {
    CategoryController: new CategoryController()
};