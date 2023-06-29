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
 *                  images:
 *                      type: array
 *                      items:
 *                          type: string
 *                          format: binary
 *          updateProduct:
 *              type: object
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
 *                  images:
 *                      type: array
 *                      items:
 *                          type: string
 *                          format: binary
 */

/**
 * @swagger
 *  /admin/products/list:
 *      get:
 *          tags: [Products(AdminPanel)]
 *          summary: Get all products
 *          parameters:
 *              -   in: query
 *                  name: search
 *                  type: string
 *                  description: text for search in title, shortText and text of product
 *          responses:
 *              200:
 *                  description: The products get successfully
 */
/**
 * @swagger
 *  /admin/products/{id}:
 *      get:
 *          tags: [Products(AdminPanel)]
 *          summery: Get product by id
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: Success
 */
/**
 * @swagger
 *  /admin/products/remove/{id}:
 *      delete:
 *          tags: [Products(AdminPanel)]
 *          summery: delete product by id
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: Success
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
/**
 * @swagger
 *  /admin/products/edit/{id}:
 *      patch:
 *          tags: [Products(AdminPanel)]
 *          summary: update a product
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *                  description: id of product
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/updateProduct'
 *          responses:
 *              200:
 *                  description: The product was successfully updated
 */