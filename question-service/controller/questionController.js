const asyncHandler = require('express-async-handler')
const { LeetCode } = require('leetcode-query')

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

// Description: Get a random question by difficulty
// Route: GET /api/questionService/question
// Access: Public
const getRandomQuestionOfDifficulty = asyncHandler(async (req, res) => {
  const { difficulty } = req.params

  if (!difficulty) {
    throw new Error('No difficulty is specified!')
  }

  // Getting all questions and randomly pick one is too slow, so we do this instead
  const titleSlug = await getTitleSlugOfRandomQuestion(difficulty)
  const problem = await leetcode.problem(titleSlug)

  if (!problem) {
    throw new Error('Cannot find problem!')
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
