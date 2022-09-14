const { deleteMatchForSocket } = require('../controller/matchController')

const timeoutTable = new Map()

const setRoomTimeout = (room, socket) => {
  const timeoutId = setTimeout(() => {
    deleteMatchForSocket(socket)
    socket.leave(room)
    socket.emit('failToMatch', {
      msg: "Sorry! We can't find a match at this time.",
    })
  }, 30000)
  timeoutTable.set(room, timeoutId)
}

const clearRoomTimeout = (room) => {
  clearTimeout(timeoutTable.get(room))
  timeoutTable.delete(room)
}

module.exports = {
  setRoomTimeout,
  clearRoomTimeout,
}
