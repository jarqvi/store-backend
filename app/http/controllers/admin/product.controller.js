const { createProductSchema } = require("../../validators/admin/product.schema");
const Controller = require("../controller");
const { deleteFileInPublic, listOfImages, copyObj, setFeatures } = require("../../../utils/functions");
const { ProductModel } = require("../../../models/products");
const path = require("path");
const { ObjectIdValidator } = require("../../validators/public.validator");
const createError = require('http-errors');
const { StatusCodes: HttpStatus } = require('http-status-codes');
const ProductBlackList = {
    BOOKMARKS: "bookmarks",
    LIKES: "likes",
    DISLIKES: "dislikes",
    COMMENTS: "comments",
    SUPPLIER: "supplier",
    WEIGHT: "weight",
    WIDTH: "width",
    LENGTH: "length",
    HEIGHT: "height",
    // COLORS: "colors"
};
Object.freeze(ProductBlackList);

class ProductController extends Controller {
    async addProduct(req, res, next) {
        try {
            const images = listOfImages(req?.files || [], req.body.fileUploadPath);
            const productBody = await createProductSchema.validateAsync(req.body);
            const { title, text, shortText, tags, category, count, discount, price, width, length, height, weight } = productBody;
            const supplier = req.user._id;
            let feature = {}, type = 'real';
            if (width || length || height || weight) {
                if (!width) feature.width = 0;
                else feature.width = width;
                if (!length) feature.length = 0;
                else feature.length = length;
                if (!weight) feature.weight = 0;
                else feature.weight = weight;
                if (!height) feature.height = 0;
                else feature.height = height;
            } else {
                type = 'virtual';
            }
            const product = await ProductModel.create({ type, feature, title, text, shortText, tags, category, count, discount, price, images, supplier });
            return res.status(HttpStatus.CREATED).json({
                statusCode: HttpStatus.CREATED,
                message: 'Product created successfully',
            });
        } catch (error) {
            deleteFileInPublic(req.body.image);
            next(error);
        }
    }
    async editProduct(req, res, next) {
        try {
            const {id} = req.params;
            const product = await ProductModel.findById(id);
            if (!product) throw createError.NotFound('Product not found');
            const data = copyObj(req.body);
            data.images = listOfImages(req?.files || [], req.body.fileUploadPath);
            data.feature = setFeatures(req.body);
            let nullishData = ['', ' ', 0, '0', null, undefined];
            let blackList = Object.values(ProductBlackList);
            Object.keys(data).forEach(key => {
                if (blackList.includes(data[key])) delete data[key];
                if (typeof data[key] == 'string') data[key] = data[key].trim();
                if (Array.isArray(data[key]) && data[key].length > 0) data[key] = data[key].map(item => item.trim());
                if (Array.isArray(data[key]) && data[key].length == 0) delete data[key];
                if (nullishData.includes(data[key])) delete data[key];
            });
            const result = await ProductModel.updateOne({_id: product._id}, {$set: data});
            if (result.modifiedCount == 0) throw {status: HttpStatus.INSUFFICIENT_STORAGE, message: 'Internal server error'};
            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                message: 'Product updated successfully',
            });
        } catch (error) {
            next(error);
        }
    }
    async removeProduct(req, res, next) {
        try {
            const productParams = await ObjectIdValidator.validateAsync(req.params);
            const { id } = productParams;
            const product = await ProductModel.findById(id);
            if (!product) throw createError.NotFound('Product not found');
            const removeProductResult = await ProductModel.deleteOne({ _id: id });
            if (removeProductResult.deletedCount == 0) throw createError.InternalServerError('Product not deleted');
            return res.status(HttpStatus.OK).json({
                data: {
                    statusCode: HttpStatus.OK,
                    message: 'Product deleted successfully'
                }
            });
        } catch (error) {
            next(error);
        }
    }
    async getAllProducts(req, res, next) {
        try {
            const search = req?.query?.search || "";
            let products;
            if (search) {
                products = await ProductModel.find({
                    $text: {
                        $search: new RegExp(search, "ig")
                    }
                })
            } else {
                products = await ProductModel.find({})
            }
            return res.status(HttpStatus.OK).json({
                data: {
                    statusCode: HttpStatus.OK,
                    products
                }
            });
        } catch (error) {
            next(error);
        }
    }
    async getOneProduct(req, res, next) {
        try {
            const productParams = await ObjectIdValidator.validateAsync(req.params);
            const { id } = productParams;
            const product = await ProductModel.findById(id);
            if (!product) throw createError.NotFound('Product not found');
            return res.status(HttpStatus.OK).json({
                data: {
                    statusCode: HttpStatus.OK,
                    product
                }
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = {
    ProductController: new ProductController
};