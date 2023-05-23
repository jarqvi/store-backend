const express = require('express');
const {default: mongoose} = require('mongoose');
const path = require('path');
const { AllRoutes } = require('./router/router');
const morgan = require('morgan');
const createError = require('http-errors');
const fs = require('fs');
const swaggerUI = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const cors = require('cors');

module.exports = class Application {
    #app = express();
    constructor(PORT, DB_URL) {
        this.configApplication();
        this.initRedis();
        this.connectToMongoDB(DB_URL);
        this.createServer(PORT);    
        this.createRoutes();
        this.errorHandling();
    }
    configApplication() {
        this.#app.use(cors());
        const logStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), { flags: 'a' });
        this.#app.use(morgan('combined', { stream: logStream }));
        this.#app.use(morgan('dev'));
        this.#app.use(express.json());
        this.#app.use(express.urlencoded({extended: true}));
        this.#app.use(express.static(path.join(__dirname, '..', 'public')));    
        this.#app.use('/api-doc',swaggerUI.serve, swaggerUI.setup(swaggerJSDoc({
            swaggerDefinition: {
                info: {
                    title: 'NodeJS API',
                    version: '1.0.0',
                    description: 'NodeJS API with Express'
                },
                servers: [
                    {
                        url: 'http://localhost:3000'
                    }
                ]
            },
            apis: ['./app/router/**/*.js']
        })));
    }
    createServer(PORT) {
        const http = require('http');
        http.createServer(this.#app).listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}.`);
        });
    }
    connectToMongoDB(DB_URL) {
        main().catch(err => console.log(err));
        async function main() {
            await mongoose.connect(DB_URL)
                .then(() => console.log('Connected to MongoDB.'))
                .catch(err => console.error('Could not Connected to MongoDB.', err));
        }
        mongoose.connection.on('connected', () => {
            console.log('Mongoose connected to DB.');
        });
        mongoose.connection.on('disconnected', () => {
            console.log('Mongoose disconnected to DB.');
        });
        process.on('SIGINT', async () => {
            await mongoose.connection.close();
            process.exit(0);
        });
    }
    initRedis() {
        require('./utils/init-redis');
    }
    createRoutes() {
        this.#app.use(AllRoutes);
    }
    errorHandling() {
        this.#app.use((req, res, next) => {
            next(createError.NotFound('Page not found.'));
        }); 
        this.#app.use((err, req, res, next) => {
            const statusCode = err.statusCode || createError.InternalServerError().statusCode;
            const message = err.message || createError.InternalServerError().message;
            return res.status(statusCode).json({
                errors: {
                    statusCode,
                    message
                }
            });
        });
    }
};