const express = require('express')
const { joinOrCreateRoom } = require('../controller/roomController')

const router = express.Router()

router.post('/:id', joinOrCreateRoom)

module.exports = router
