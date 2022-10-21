const express = require('express')
const {
  getRandomQuestionOfDifficulty,
  test,
} = require('../controller/questionController')

const router = express.Router()

router.get('/random/:roomId', getRandomQuestionOfDifficulty)
router.post('/test', test)

module.exports = router
