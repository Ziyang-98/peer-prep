const { createClient } = require('redis')

const redisClient = createClient({
  socket: {
    host: 'redis-10745.c299.asia-northeast1-1.gce.cloud.redislabs.com',
    port: 10745
  },
  password: 'HwDKiJnZH8oceNGS6K76sakPj08mDldK'
})

const connectCache = async () => {
  try {
    await redisClient.connect()
    await redisClient.flushAll() // TODO: need to check if this is correct in distributed system
    redisClient.on('error', console.error)
    console.log('Connected to redis locally!')
  } catch (error) {
    console.log('Error connecting to redis:', error)
  }
}

module.exports = { connectCache, redisClient }
