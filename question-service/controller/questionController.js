const asyncHandler = require('express-async-handler')
const { LeetCode } = require('leetcode-query')

const { redisClient } = require('../config/cache')

const leetcode = new LeetCode()

function hash(str) {
  let hashCode = 0
  for (let i = 0, len = str.length; i < len; i++) {
    const chr = str.charCodeAt(i)
    // eslint-disable-next-line no-bitwise
    hashCode = (hashCode << 5) - hashCode + chr
    // eslint-disable-next-line no-bitwise
    hashCode |= 0 // Convert to 32bit integer
  }
  return hashCode
}

function getQuestionNumber(roomId, total) {
  return hash(roomId) % total
}

async function getTotalNumOfQuestionsByDifficulty(difficulty) {
  const { total } = await leetcode.problems({
    filters: { difficulty: difficulty.toUpperCase() },
    limit: 1,
  })

  return total
}

// Getting all questions and randomly pick one is too slow, so we do this instead
async function getTitleSlugOfRandomQuestion(roomId, difficulty) {
  const total = await getTotalNumOfQuestionsByDifficulty(difficulty)
  let titleSlug = ''
  let probingOffset = 0

  while (!titleSlug) {
    // eslint-disable-next-line no-await-in-loop
    const { questions } = await leetcode.problems({
      filters: { difficulty: difficulty.toUpperCase() },
      limit: 1,
      offset: getQuestionNumber(roomId, total) + probingOffset,
    })

    if (!questions.length) {
      throw new Error('Cannot find question!')
    }

    const question = questions[0]

    // To prevent sending premium leetcode question, which the content is not accessible
    if (!question.isPaidOnly) {
      titleSlug = question.titleSlug
    }

    probingOffset++
  }

  return titleSlug
}

async function getRandomProblem(roomId, difficulty) {
  const titleSlug = await getTitleSlugOfRandomQuestion(roomId, difficulty)
  const problem = await leetcode.problem(titleSlug)

  return problem
}

function extractDifficulty(roomId) {
  const split = roomId.split('-')

  if (split.length !== 3) {
    throw new Error('This is not a valid roomId')
  }

  return split[1]
}

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

  res.status(200).json({
    questionId: problem.questionId,
    questionFrontendId: problem.questionFrontendId,
    title: problem.title,
    content: problem.content,
    difficulty: problem.difficulty,
    likes: problem.likes,
    dislikes: problem.dislikes,
    similarQuestions: problem.similarQuestions,
    topicTags: problem.topicTags,
    codeSnippets: problem.codeSnippets,
    stats: problem.stats,
    hints: problem.hints,
    sampleTestCase: problem.sampleTestCase,
  })
})

module.exports = {
  getRandomQuestionOfDifficulty,
}
