const asyncHandler = require('express-async-handler')
const { LeetCode } = require('leetcode-query')

const Problem = require('../model/problemModel')
const {
  extractDifficulty,
  getRandomProblem,
} = require('../utils/questionHelper')

const leetcode = new LeetCode()

// Description: Get a random question for the room
// Route: GET /api/questionService/question/random/:roomId
// Access: Public
const getRandomQuestionOfDifficulty = asyncHandler(async (req, res) => {
  const { roomId } = req.params

  if (!roomId) {
    throw new Error('No roomId is given!')
  }

  const difficulty = extractDifficulty(roomId)
  const problem = await getRandomProblem(roomId, difficulty)

  res.status(200).json(problem)
})
})

module.exports = {
  getRandomQuestionOfDifficulty,
}
