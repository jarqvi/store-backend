const redisDB = require('redis');
const redisClient = redisDB.createClient();

redisClient.connect();
redisClient.on('connect', () => {console.log('Redis client connected.')});
redisClient.on('ready', () => {console.log('Redis is ready to use.')});
redisClient.on('error', (err) => {console.log('Redis error: ', err)});
redisClient.on('end', () => {console.log('Disconnected from Redis.')});

module.exports = redisClient;