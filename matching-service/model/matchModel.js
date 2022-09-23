const mongoose = require('mongoose')

const matchSchema = mongoose.Schema(
  {
    // TODO: check how to refer to User in User Service in other database
    // user: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   required: true,
    //   ref: 'User'
    // },
    user: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      required: true,
    },
    room: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Match', matchSchema)
