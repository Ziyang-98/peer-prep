const Match = require('../model/matchModel')
const asyncHandler = require('express-async-handler')
const { v4 } = require('uuid')
const {
  STATUS_CODE_SUCCESS,
  STATUS_CODE_BAD_REQUEST,
} = require('../utils/constants')

// Description: Create a match
// Route: POST /api/matchService/match
// Access: Private
const createMatch = asyncHandler(async (req, res) => {
  const { difficulty, user } = req.body

  // Check input
  if (!difficulty || !user) {
    res.status(STATUS_CODE_BAD_REQUEST)
    throw new Error('Please add all fields!')
  }

  // Check if user already waiting for a match
  const matchWithSameUserExists = await Match.findOne({ user })

  if (matchWithSameUserExists) {
    res.status(STATUS_CODE_BAD_REQUEST)
    throw new Error('Cannot have multiple waiting matches at the same time!')
  }

  // Find a match with same difficulty
  const match = await Match.findOne({ difficulty })

  if (match) {
    const { room } = match

    await match.remove()
    res.status(STATUS_CODE_SUCCESS).json({ room, isMatch: true })
  } else {
    const { id, room } = await Match.create({
      user,
      difficulty,
      room: generateRoom(difficulty),
    })

    res.status(STATUS_CODE_SUCCESS).json({ id, room, isMatch: false })
  }
})

// Description: Delete a match
// Route: DELETE /api/matchService/match/:id
// Access: Private
const deleteMatch = async (req, res) => {
  const id = req.params.id
  const match = await Match.findById(id)

  if (!match) {
    res.status(STATUS_CODE_BAD_REQUEST)
    throw new Error('Match not found!')
  }

  await match.remove()

  res.status(STATUS_CODE_SUCCESS).json({ id })
}

const deleteMatchForSocket = async (socket) => {
  for (const room of socket.rooms.values()) {
    const roomSplit = room.split('-')

    if (roomSplit[0] === 'match') {
      const match = await Match.findOne({ room })

      if (match) {
        await match.remove()
        return
      }
    }
  }
}

const generateRoom = (difficulty) => `match-${difficulty}-${v4()}`

module.exports = {
  createMatch,
  deleteMatch,
  deleteMatchForSocket,
}
