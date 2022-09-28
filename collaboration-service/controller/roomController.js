const asyncHandler = require('express-async-handler')

const { redisClient } = require('../config/cache')

const joinOrCreateRoom = asyncHandler(async (req, res) => {
  const { roomId } = req.params
})

module.exports = {
  joinOrCreateRoom,
}
