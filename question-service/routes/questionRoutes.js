const express = require('express')
const {
  getRandomQuestionOfDifficulty,
} = require('../controller/questionController')

const router = express.Router()

router.get('/random/:roomId', getRandomQuestionOfDifficulty)

module.exports = router
