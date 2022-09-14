const express = require('express')
const router = express.Router()

const { createMatch, deleteMatch } = require('../controller/matchController')

router.post('/', createMatch)
router.delete('/:id', deleteMatch)

module.exports = router
