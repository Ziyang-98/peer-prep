const { Model, DataTypes } = require('sequelize')
const db = require('../db')

class Match extends Model {}

Match.init({
  difficulty: {
    type: DataTypes.STRING
  },
  room: {
    type: DataTypes.STRING
  },
  username: {
    type: DataTypes.STRING
  }
}, { sequelize: db, modelName: 'match', timestamps: false })

module.exports = Match
