/**
 * @swagger
 *  components:
 *      schemas:
 *          Types:
 *              type: string
 *              enum:
 *                  -   free
 *                  -   cash
 *                  -   special
 *          Course:
 *              type: object
 *              required:
 *                  -   title
 *                  -   shortText
 *                  -   text
 *                  -   tags
 *                  -   category
 *                  -   price
 *                  -   discount
 *                  -   image
 *                  -   type
 *              properties:
 *                  title:
 *                      type: string
 *                      description: title of the course
 *                  shortText:
 *                      type: string
 *                      description: shortText of the course
 *                  text:
 *                      type: string
 *                      description: text of the course
 *                  tags:
 *                      type: array
 *                      description: tags of the course
 *                  category:
 *                      type: string
 *                      description: category of the course
 *                  price:
 *                      type: string
 *                      description: price of the course
 *                  discount:
 *                      type: string
 *                      description: discount of the course
 *                  image:
 *                      type: string
 *                      format: binary
 *                  type: 
 *                      $ref: '#/components/schemas/Types'
 *          AddChapter:
 *              type: object
 *              required:
 *                  -   id            
 *                  -   title
 *              properties:   
 *                  id:
 *                      type: string
 *                      example: "649c022a50430f4c56d94867"
 *                  title:
 *                      type: string
 *                      example: chapter-1
 *                  text:
 *                      type: string
 *                      example: the describe about this chapter
 *          UpdateChapter:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                      example: "title-1"
 *                  text:
 *                      type: string
 *                      example: "text of chapter"
 *          AddEpisode:
 *              type: object
 *              required: 
 *                  -   courseId
 *                  -   chapterId
 *                  -   title
 *                  -   text
 *                  -   video
 *                  -   type
 *              properties:
 *                  courseId:
 *                      type: string
 *                      example: 649c022a50430f4c56d94867
 *                  chapterId:
 *                      type: string
 *                      example: 64a133a83e323c967a07c0fd
 *                  title:
 *                      type: string
 *                      description: the describe about this episode  
 *                      example: video-1  
 *                  text:
 *                      type: string
 *                      description: the title of episode
 *                      example: about programming
 *                  video:
 *                      type: string
 *                      description: the file of video (hh:mm:ss)
 *                      format: binary
 *                  type:
 *                      type: string
 *                      description: the episode type (unlock or lock)
 *                      enum:
 *                          -   unlock      
 *                          -   lock      
 */
/**
 * @swagger
 *  definitions:
 *      ListOfCourses:
 *          type: object
 *          properties:
 *              statusCode:
 *                  type: integer
 *                  example: 200
 *              data:
 *                  type: object
 *                  properties:
 *                      courses:
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties:
 *                                  _id:
 *                                      type: string
 *                                      example: "649c022a50430f4c56d94867"
 *                                  title:
 *                                      type: string
 *                                      example: "title of course"
 *                                  shortText:
 *                                      type: string
 *                                      example: "shortText of course"
 *                                  text:
 *                                      type: string
 *                                      example: "text of course"
 *                                  status:
 *                                      type: string
 *                                      example: "notStarted | Completed | Holding"
 *                                  time:
 *                                      type: string
 *                                      example: "01:20:35"
 *                                  price:
 *                                      type: integer
 *                                      example: 250000
 *                                  discount:
 *                                      type: integer
 *                                      example: 20
 *                                  studentCount:
 *                                      type: integer
 *                                      example: 500
 *                                  teacher:
 *                                      type: string
 *                                      example: "John Doe"
 * 
 * 
 */
/**
 * @swagger
 *  definitions:
 *      ListOfChapters:
 *          type: object
 *          properties:
 *              statusCode:
 *                  type: integer
 *                  example: 200
 *              data:
 *                  type: object
 *                  properties:
 *                      chapters:
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties:
 *                                  _id:
 *                                      type: string
 *                                      example: "649c022a50430f4c56d94867"
 *                                  title:
 *                                      type: string
 *                                      example: "course"
 *                                  chapters:
 *                                      type: array
 *                                      items:
 *                                          type: object
 *                                      example: [{title: "title", text: "text", episodes: [], _id: "649c022a50430f4c56d94867"}]
 *                                  
 */
/**
 * @swagger
 *  definitions:
 *      publicDefinition:
 *          type: object
 *          properties:
 *              statusCode:
 *                  type: integer
 *                  example: 20X
 *              data:
 *                  type: object
 *                  properties:
 *                      message:
 *                          type: string
 *                          example: "successfully"
 */
/**
 * @swagger
 *  /admin/courses/list:
 *      get:
 *          tags: [Course(AdminPanel)]
 *          summery: get all of courses
 *          parameters:
 *              -   in: query
 *                  name: search
 *                  type: string
 *                  description: search in title, shortText, text
 *          responses:
 *              200:
 *                  description: successfully
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/ListOfCourses'
 */
/**
 * @swagger
 *  /admin/courses/add:
 *      post:
 *          tags: [Course(AdminPanel)]
 *          summary: Add new course
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/Course'
 *          responses:
 *              201:
 *                  description: The course was successfully added
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/publicDefinition'
 */
/**
 * @swagger
 *  /admin/courses/{id}:
 *      get:
 *          tags: [Course(AdminPanel)]
 *          summery: get all of courses
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string       
 *                  required: true
 *          responses:
 *              200:
 *                  description: successfully
 */
/**
 * @swagger
 *  /admin/courses/chapter:
 *      put:
 *          tags: [Course(AdminPanel)]
 *          summery: add chapter to course
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/AddChapter'
 *          responses:
 *              201:
 *                  description: The course was successfully added
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/publicDefinition'
 */
/**
 * @swagger
 *  /admin/courses/chapter-list/{id}:
 *      get:
 *          tags: [Course(AdminPanel)]
 *          summery: add chapter to course
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *                  description: id of course
 *          responses:
 *              200:
 *                  description: The course was successfully added
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/ListOfChapters'
 */
/**
 * @swagger
 *  /admin/courses/remove-chapter/{id}:
 *      patch:
 *          tags: [Course(AdminPanel)]
 *          summery: remove chapter from course
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *                  description: id of chapter
 *          responses:
 *              200:
 *                  description: The course was successfully added
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/publicDefinition'
 */
/**
 * @swagger
 *  /admin/courses/update-chapter/{id}:
 *      put:
 *          tags: [Course(AdminPanel)]
 *          summery: update chapter to course
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *                  description: id of chapter
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/UpdateChapter'    
 *          responses:
 *              200:
 *                  description: The course was successfully added
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/publicDefinition'
 */
/**
 * @swagger
 *  /admin/courses/add-episode:
 *      post:
 *          tags: [Course(AdminPanel)]
 *          summary: Add new episode
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/AddEpisode'
 *          responses:
 *              201:
 *                  description: The episode was successfully added
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/publicDefinition'
 */
/**
 * @swagger
 *  /admin/courses/remove-episode/{id}:
 *      delete:
 *          tags: [Course(AdminPanel)]
 *          summary: remove episode
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: The episode was successfully removed
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/publicDefinition'
 */