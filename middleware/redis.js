const redis = require('./redis');

// Inicia um cliente Redis
const redisClient = redis.createClient();

redisClient.on('error', (err) => {
    console.log('Erro ao conectar ao cliente Redis', err);
});

redisClient.connect()

module.exports = redisClient;