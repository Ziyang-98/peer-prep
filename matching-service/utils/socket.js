const timeoutTable = new Map()

exports.setRoomTimeout = (room, socket) => {
  const timeoutId = setTimeout(() => {
    socket.emit('failToMatch', { msg: "Sorry! We can't find a match at this time." })
  }, 30000)
  timeoutTable.set(room, timeoutId)
}

exports.clearRoomTimeout = (room) => {
  clearTimeout(timeoutTable.get(room))
  timeoutTable.delete(room)
}
