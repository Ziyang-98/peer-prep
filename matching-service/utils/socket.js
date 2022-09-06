const { findMatchWith } = require('./orm')

const timeoutTable = new Map()

exports.setRoomTimeout = (room, socket) => {
  const timeoutId = setTimeout(() => {
    this.deleteMatch(socket)
    socket.leave(room)
    socket.emit('failToMatch', { msg: "Sorry! We can't find a match at this time." })
  }, 30000)
  timeoutTable.set(room, timeoutId)
}

exports.clearRoomTimeout = (room) => {
  clearTimeout(timeoutTable.get(room))
  timeoutTable.delete(room)
}

exports.deleteMatch = async (socket) => {
  for (const room of socket.rooms.values()) {
    const roomSplit = room.split('-')
    
    if (roomSplit[0] === 'match') {
        const match = await findMatchWith({ room })

        if (match) {
            await match.destroy()
            return
        }
    }
}
}
