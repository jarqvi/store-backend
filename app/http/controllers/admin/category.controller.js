const { CategoryModel } = require("../../../models/categories");
const { addCategorySchema, updateCategorySchema } = require("../../validators/admin/category.schema");
const Controller = require("../controller");
const createError = require("http-errors");
const mongoose = require('mongoose');
const {StatusCodes: HttpStatus} = require('http-status-codes');

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
            return res.status(HttpStatus.CREATED).json({
                data: {
                    statusCode: HttpStatus.CREATED,
                    message: 'Category created successfully',
                }
            });
        } catch (error) {
            next(error);
        }
    }
    async editCategory(req, res, next) {
        try {
            const {id} = req.params;
            const {title} = req.body;
            const category = await this.checkExistCategory(id);
            await updateCategorySchema.validateAsync(req.body);
            const result = await CategoryModel.updateOne({_id: id}, {$set: {title}});
            if (result.modifiedCount == 0) throw createError.InternalServerError('Server error.');
            return res.status(HttpStatus.ACCEPTED).json({
                data: {
                    statusCode: HttpStatus.ACCEPTED,
                    message: 'Success',
                }
            });
        } catch (error) {
            next(error);
        }
    }
    async removeCategory(req, res, next) {
        try {
            const {id} = req.params;
            const category = await this.checkExistCategory(id);
            const deleteResult = await CategoryModel.deleteMany({
                $or: [
                    {_id: category._id},
                    {parent: category._id}
                ]
            });
            if (deleteResult.deletedCount == 0) throw createError.InternalServerError('Server error.');
            return res.status(HttpStatus.ACCEPTED).json({
                data: {
                    statusCode: HttpStatus.ACCEPTED,
                    message: 'Category deleted.'
                }
            });
        } catch (error) {
            next(error);
        }
    }
    async getAllCategory(req, res, next) {
        try {
            const categories = await CategoryModel.find({parent: undefined}, {__v: 0, id: 0});
            return res.status(HttpStatus.OK).json({
                data: {
                    statusCode: HttpStatus.OK,
                    message: 'Success',
                    categories
                }
                
            });
        } catch (error) {
            next(error);
        }
    }
    async getCategoryById(req, res, next) {
        try {
            const {id} = req.params;
            const categories = await CategoryModel.aggregate([
                {
                    $match: {
                        _id: new mongoose.Types.ObjectId(id)
                    }
                },
                {
                    $lookup: {
                        from: 'categories',
                        localField: '_id',
                        foreignField: 'parent',
                        as: 'children'
                    }
                }, 
                {
                    $project: {
                        __v: 0,
                        'children.__v': 0,
                        'children.parent': 0
                    }
                }
            ]);
            return res.status(HttpStatus.OK).json({
                data: {
                    statusCode: HttpStatus.OK,
                    message: 'Success',
                    categories
                }
                
            });
        } catch (error) {
            next(error);
        }
    }
    async getAllParents(req, res, next) {
        try {
            const parents = await CategoryModel.find({parent: undefined}, {__v: 0});
            return res.status(HttpStatus.OK).json({
                data: {
                    statusCode: HttpStatus.OK,
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
            return res.status(HttpStatus.OK).json({
                data: {
                    statusCode: HttpStatus.OK,
                    message: 'Success',
                    children
                }
            });
        } catch (error) {
            next(error);
        }
    }
    async getAllCategoryWithoutPopulate(req, res, next) {
        try {
            const categories = await CategoryModel.aggregate([{$match: {}}]);
            return res.status(HttpStatus.OK).json({
                data: {
                    statusCode: HttpStatus.OK,
                    message: 'Success',
                    categories
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