/**
 * @swagger
 *  components:
 *      schemas:
 *          Category:
 *              type: object
 *              required:
 *                  -   title
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of category
 *                  parent:
 *                      type: string
 *                      description: the parent of category        
 */

/**
 * @swagger
 *  /admin/category/add:
 *      post:
 *          tags: [Category(AdminPanel)]
 *          summery: Create new category title
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/Category'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Category'
 *          responses:
 *              201:
 *                  description: Success
 */
/**
 * @swagger
 *  /admin/category/parents:
 *      get:
 *          tags: [Category(AdminPanel)]
 *          summery: Get all parent categories
 *          responses:
 *              200:
 *                  description: Success
 */
/**
 * @swagger
 *  /admin/category/children/{parent}:
 *      get:
 *          tags: [Category(AdminPanel)]
 *          summery: Get all child categories
 *          parameters:
 *              -   in: path
 *                  name: parent
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: Success
 */
/**
 * @swagger
 *  /admin/category/all:
 *      get:
 *          tags: [Category(AdminPanel)]
 *          summery: Get all categories
 *          responses:
 *              200:
 *                  description: Success
 */
/**
 * @swagger
 *  /admin/category/delete/{id}:
 *      delete:
 *          tags: [Category(AdminPanel)]
 *          summery: Delete category by id
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          responses:
 *              202:
 *                  description: Success
 */
/**
 * @swagger
 *  /admin/category/list-of-all:
 *      get:
 *          tags: [Category(AdminPanel)]
 *          summery: Get all categories without populate
 *          responses:
 *              202:
 *                  description: Success
 */
/**
 * @swagger
 *  /admin/category/update/{id}:
 *      patch:
 *          tags: [Category(AdminPanel)]
 *          summery: Edit or update category title
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/Category'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Category'         
 *          responses:
 *              202:
 *                  description: Success
 *              500:
 *                  description: Internal server error
 */
/**
 * @swagger
 *  /admin/category/{id}:
 *      get:
 *          tags: [Category(AdminPanel)]
 *          summery: Get category by id
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          responses:
 *              202:
 *                  description: Success
 */