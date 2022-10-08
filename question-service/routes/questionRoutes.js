const express = require('express')
const {
  getRandomQuestionOfDifficulty,
} = require('../controller/questionController')

const router = express.Router()

router.get('/random/:difficulty', getRandomQuestionOfDifficulty)

module.exports = router
