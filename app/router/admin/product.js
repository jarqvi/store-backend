const { ProductController } = require('../../http/controllers/admin/product.controller');
const { stringToArray } = require('../../http/middlewares/stringToArray');
const { uploadFile } = require('../../utils/multer');

const router = require('express').Router();

/**
 * @swagger
 *  components:
 *      schemas:
 *          Product:
 *              type: object
 *              required:
 *                  -   title
 *                  -   shortText
 *                  -   text
 *                  -   tags
 *                  -   category
 *                  -   price
 *                  -   discount
 *                  -   count
 *              properties:
 *                  title:
 *                      type: string
 *                      description: title of the product
 *                  shortText:
 *                      type: string
 *                      description: shortText of the product
 *                  text:
 *                      type: string
 *                      description: text of the product
 *                  tags:
 *                      type: array
 *                      description: tags of the product
 *                  category:
 *                      type: string
 *                      description: category of the product
 *                  price:
 *                      type: string
 *                      description: price of the product
 *                  discount:
 *                      type: string
 *                      description: discount of the product
 *                  count:
 *                      type: string
 *                      description: count of the product
 *                  height:
 *                      type: string
 *                      description: height of the product package
 *                  weight:
 *                      type: string
 *                      description: weight of the product package
 *                  width:
 *                      type: string
 *                      description: width of the product package
 *                  length:
 *                      type: string
 *                      description: length of the product package
 *                  image:
 *                      type: file
 *                      description: images of the product
 */

/**
 * @swagger
 *  /admin/products/add:
 *      post:
 *          tags: [Products(AdminPanel)]
 *          summary: Add new product
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          responses:
 *              201:
 *                  description: The product was successfully added
 */
router.post('/add', uploadFile.single('image'), stringToArray('tags'), ProductController.addProduct);
// router.patch();
// router.delete();
// router.get();
// router.get();

module.exports = {
    AdminApiProductRouter: router
};