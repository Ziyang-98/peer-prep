const { createClient } = require('redis')

const redisClient = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379',
})

const connectCache = async () => {
  try {
    await redisClient.connect()
    await redisClient.flushAll()
    redisClient.on('error', console.error)
    console.log('Connected to redis locally!')
  } catch (error) {
    console.log('Error connecting to redis:', error)
  }
}

module.exports = { connectCache, redisClient }
