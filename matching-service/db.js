const { Sequelize } = require('sequelize')
const DB_PATH = './dev.sqlite'

module.exports = new Sequelize({
  dialect: 'sqlite',
  storage: DB_PATH
})
