const { Model, DataTypes } = require('sequelize')
const db = require('../db')

class Match extends Model {}

Match.init({
  difficulty: {
    type: DataTypes.STRING
  },
  status: {
    type: DataTypes.STRING
  },
  user1: {
    type: DataTypes.STRING
  },
  user2: {
    type: DataTypes.STRING
  }
}, { sequelize: db, modelName: 'match', timestamps: false })

module.exports = Match
