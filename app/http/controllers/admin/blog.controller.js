const { BlogModel } = require("../../../models/blogs");
const { deleteFileInPublic } = require("../../../utils/functions");
const { createBlogSchema } = require("../../validators/admin/blog.schema");
const Controller = require("../controller");
const path = require('path');
const createError = require('http-errors');
const { default: mongoose } = require("mongoose");

class BlogController extends Controller {
    async createBlog(req, res, next) {
        try {
            const blogDataBody = await createBlogSchema.validateAsync(req.body);
            req.body.image = path.join(blogDataBody.fileUploadPath, blogDataBody.fileName).replace(/\\/g, '/');
            const {title, text, shortText, tags, category} = blogDataBody;
            const image = req.body.image;
            const author = req.user._id;
            const blog = await BlogModel.create({title, text, shortText, tags, category, image, author});
            return res.status(201).json({
                data: {
                    statusCode: 201,
                    message: 'Blog created successfully'
                }
            });
        } catch (error) {
            deleteFileInPublic(req.body.image)
            next(error);
        }
    }
    async getOneBlogById(req, res, next) {
        try {
            const {id} = req.params;
            // const blog = this.findBlog({_id: id});
            const blog = await BlogModel.aggregate([
                {
                    $match: {_id: new mongoose.Types.ObjectId(id)}
                },
                {
                    $lookup: {
                        from: 'users',
                        foreignField: '_id',
                        localField: 'author',
                        as: 'author'
                    }
                },
                {
                    $unwind: '$author'
                },
                {
                    $lookup: {
                        from: 'categories',
                        foreignField: '_id',
                        localField: 'category',
                        as: 'category'
                    }
                },
                {
                    $unwind: '$category'
                },
                {
                    $project: {
                        "author.roles": 0,
                        "author.otp": 0,
                        "author.__v": 0,
                        "category.__v": 0,
                        "author.discount": 0,
                        "author.bills": 0,
                    }
                }
            ]);
            return res.status(200).json({
                data: {
                    statusCode: 200,
                    blog
                }
            });
        } catch (error) {
            next(error);
        }
    }
    async getListOfBlog(req, res, next) {
        try {
            const blogs = await BlogModel.aggregate([
                {
                    $match: {}
                },
                {
                    $lookup: {
                        from: 'users',
                        foreignField: '_id',
                        localField: 'author',
                        as: 'author'
                    }
                },
                {
                    $unwind: '$author'
                },
                {
                    $lookup: {
                        from: 'categories',
                        foreignField: '_id',
                        localField: 'category',
                        as: 'category'
                    }
                },
                {
                    $unwind: '$category'
                },
                {
                    $project: {
                        "author.roles": 0,
                        "author.otp": 0,
                        "author.__v": 0,
                        "category.__v": 0,
                        "author.discount": 0,
                        "author.bills": 0,
                    }
                }
            ]);
            return res.status(200).json({
                data: {
                    statusCode: 200,
                    blogs
                }
            });
        } catch (error) {
            next(error);
        }
    }
    async getCommentsOfBlog(req, res, next) {
        try {
            
        } catch (error) {
            next(error);
        }
    }   
    async deleteBlogById(req, res, next) {
        try {
            const {id} = req.params;
            const blog = await BlogModel.findById(id);
            if (!blog) throw createError.NotFound('Blog not found.');
            const result = await BlogModel.deleteOne({_id: id});
            if (result.deletedCount == 0) throw createError.InternalServerError('Blog not deleted');
            return res.status(200).json({
                data: {
                    statusCode: 200,
                    message: 'Deleted blog successfully'
                }
            });
        } catch (error) {
            next(error);
        }
    }
    async updateBlogById(req, res, next) {
        try {
            const {id} = req.params;
            const blog = await BlogModel.findById(id);
            if (!blog) throw createError.NotFound('Blog not found');
            if (req?.body?.fileUploadPath && req?.body?.fileName) {
                req.body.image = path.join(req.body.fileUploadPath, req.body.fileName).replace(/\\/g, '/');
            }
            const data = req.body;
            let nullishData = ['', ' ', 0, '0', null, undefined];
            let blackList = ['bookmarks', 'comments', 'likes', 'dislikes', 'author'];
            Object.keys(data).forEach(key => {
                if (blackList.includes(data[key])) delete data[key];
                if (typeof data[key] == 'string') data[key] = data[key].trim();
                if (Array.isArray(data[key]) && Array.length > 0) data[key] = data[key].map(item => item.trim());
                if (nullishData.includes(data[key])) delete data[key];
            });
            const result = await BlogModel.updateOne({_id: id}, {$set: data});
            if (result.modifiedCount == 0) throw createError.InternalServerError('Blog not updated');
            return res.status(201).json({
                data: {
                    statusCode: 201,
                    message: 'Blog updated successfully'
                }
            });
        } catch (error) {
            deleteFileInPublic(req?.body?.image)
            next(error);
        }
    }
}

module.exports = {
    AdminBlogController: new BlogController()
};