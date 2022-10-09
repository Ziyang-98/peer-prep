const timeoutTable = new Map()

const setRoomTimeout = (room, socket) => {
  const timeoutId = setTimeout(() => {
    socket.leave(room)
    socket.emit('timesUp', {
      message: 'Time is up! 30 minutes have passed!',
    })
  }, 1800000)
  timeoutTable.set(room, timeoutId)

  // automatic delete the entry in timeoutTable after 30 mins is up with a 10 seconds delay
  setTimeout(() => {
    timeoutTable.delete(room)
  }, 1810000)
}

const clearRoomTimeout = (room) => {
  clearTimeout(timeoutTable.get(room))
  timeoutTable.delete(room)
}

module.exports = {
  setRoomTimeout,
  clearRoomTimeout,
}
