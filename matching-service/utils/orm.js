const Match = require('../models/Match')

exports.createMatch = async (difficulty, username) => {
  const { v4 } = require('uuid')
  const room = `match-${difficulty}-${v4()}`
  const newMatch = {
    difficulty,
    username,
    room
  }

  return await Match.create(newMatch)
}

exports.findMatchWith = async (opt) => {
  return await Match.findOne({ where: opt})
}

exports.deleteMatchWithId = async (id) => {
  return await Match.destroy({ where: { id }})
}
