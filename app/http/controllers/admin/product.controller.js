const Controller = require("../controller");

class ProductController extends Controller {
    addProduct(req, res, next) {
        try {
            return res.json(req.body);
        } catch (error) {
            next(error);
        }
    }
    editProduct(req, res, next) {
        try {
            
        } catch (error) {
            next(error);
        }
    }
    removeProduct(req, res, next) {
        try {
            
        } catch (error) {
            next(error);
        }
    }
    getAllProducts(req, res, next) {
        try {
            
        } catch (error) {
            next(error);
        }
    }
    getOneProduct(req, res, next) {
        try {
            
        } catch (error) {
            next(error);
        }
    }
}

module.exports = {
    ProductController: new ProductController
};