const asyncHandler = require('express-async-handler')
const { LeetCode } = require('leetcode-query')

const { redisClient } = require('../config/cache')

const leetcode = new LeetCode()

function getRandomNumber(total) {
  return Math.floor(Math.random() * total)
}

async function getTotalNumOfQuestionsByDifficulty(difficulty) {
  const { total } = await leetcode.problems({
    filters: { difficulty: difficulty.toUpperCase() },
    limit: 1,
  })

  return total
}

// Getting all questions and randomly pick one is too slow, so we do this instead
async function getTitleSlugOfRandomQuestion(difficulty) {
  const total = await getTotalNumOfQuestionsByDifficulty(difficulty)
  const { questions } = await leetcode.problems({
    filters: { difficulty: difficulty.toUpperCase() },
    limit: 1,
    offset: getRandomNumber(total),
  })

  if (!questions.length) {
    throw new Error('Cannot find question!')
  }

  const { titleSlug } = questions[0]

  return titleSlug
}

async function getRandomProblem(difficulty) {
  const titleSlug = await getTitleSlugOfRandomQuestion(difficulty)
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

  let problem = null
  const key = `${roomId}:question`

  const problemJsonString = await redisClient.get(key)

  if (problemJsonString) {
    // Cache hit
    problem = JSON.parse(problemJsonString)
  } else {
    // Cache miss
    const difficulty = extractDifficulty(roomId)

    // To prevent sending premium leetcode question, which the content is not accessible
    while (!problem?.content) {
      // eslint-disable-next-line no-await-in-loop
      problem = await getRandomProblem(difficulty)
    }

    await redisClient.set(key, JSON.stringify(problem))
  }

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
