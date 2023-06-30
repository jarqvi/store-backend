/**
 * @swagger
 *  components:
 *      schemas:
 *          AddBlog:
 *              type: object
 *              required:
 *                  -   title
 *                  -   text
 *                  -   shortText
 *                  -   tags
 *                  -   category
 *                  -   image
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of blog
 *                  text:
 *                      type: string
 *                      description: the text of blog
 *                  shortText:
 *                      type: string
 *                      description: the shortText of blog
 *                  tags:
 *                      type: string
 *                      description: the tags of blog 
 *                  category:
 *                      type: string
 *                      description: the category id of blog
 *                  image:
 *                      type: file
 *                      description: the image of blog
 *          UpdateBlog:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of blog
 *                  text:
 *                      type: string
 *                      description: the text of blog
 *                  shortText:
 *                      type: string
 *                      description: the shortText of blog
 *                  tags:
 *                      type: string
 *                      description: the tags of blog 
 *                  category:
 *                      type: string
 *                      description: the category id of blog
 *                  image:
 *                      type: file
 *                      description: the image of blog         
 */

/**
 * @swagger
 *  /admin/blogs:
 *      get:
 *          tags: [Blog(AdminPanel)]
 *          summery: get all blogs
 *          responses:
 *              200:
 *                  description: success - get all blogs
 */
/**
 * @swagger
 *  /admin/blogs/add:
 *    post:
 *      tags: [Blog(AdminPanel)]
 *      summery: create new blog
 *      requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/AddBlog'
 *      responses:
 *          201:
 *              description: success - create new blog
 *              content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/publicDefinition'
 */
/**
 * @swagger
 *  /admin/blogs/{id}:
 *      get:
 *          tags: [Blog(AdminPanel)]
 *          summery: get one blog by id
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: success - get one blog by id
 */
/**
 * @swagger
 *  /admin/blogs/remove/{id}:
 *      delete:
 *          tags: [Blog(AdminPanel)]
 *          summery: delete blog by id
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: success - delete blog by id
 */
/**
 * @swagger
 *  /admin/blogs/update/{id}:
 *    patch:
 *      tags: [Blog(AdminPanel)]
 *      summery: update blog by id
 *      consumes:
 *          - multipart/form-data
 *      parameters:
 *          -   in: path
 *              name: id
 *              type: string
 *              required: true
 *      requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/UpdateBlog'
 *      responses:
 *          201:
 *              description: success - update blog by id
 */