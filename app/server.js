const express = require('express');
const {default: mongoose} = require('mongoose');
const path = require('path');
const { AllRoutes } = require('./router/router');

module.exports = class Application {
    #app = express();
    constructor(PORT, DB_URL) {
        this.configApplication();
        this.connectToMongoDB(DB_URL);
        this.createServer(PORT);    
        this.createRoutes();
        this.errorHandling();
    }
    configApplication() {
        this.#app.use(express.json());
        this.#app.use(express.urlencoded({extended: true}));
        this.#app.use(express.static(path.join(__dirname, '..', 'public')));
    }
    createServer(PORT) {
        const http = require('http');
        http.createServer(this.#app).listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}.`);
        });
    }
    connectToMongoDB(DB_URL) {
        const mongoose = require('mongoose');
        main().catch(err => console.log(err));
        async function main() {
            await mongoose.connect(DB_URL)
                .then(() => console.log('Connected to MongoDB.'))
                .catch(err => console.error('Could not Connected to MongoDB.', err));
        }
    }
    createRoutes() {
        this.#app.use(AllRoutes);
    }
    errorHandling() {
        this.#app.use((req, res, next) => {
            return res.status(404).json({
                statusCode: 404,
                message: 'Page not found.'
            });
        }); 
        this.#app.use((err, req, res, next) => {
            const statusCode = err.statusCode || 500;
            const message = err.message || 'Internal server error.';
            return res.status(statusCode).json({
                statusCode,
                message
            });
        });
    }
};