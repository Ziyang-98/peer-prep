const timerTable = new Map()
const intervalIdTable = new Map()

const clearRoomTimer = (roomId) => {
  const intervalId = intervalIdTable.get(roomId)
  clearInterval(intervalId)
  timerTable.delete(roomId)
  intervalIdTable.delete(roomId)
}

const emitTimer = (roomId, io) => {
  let timer = timerTable.get(roomId)

  // Start timer at 30 mins
  if (timer === undefined) {
    timer = 10000
  }

  if (timer > 0) {
    timer -= 1000
    timerTable.set(roomId, timer)
  }

  io.to(roomId).emit('currentTime', {
    timer,
  })
}

const initTimer = (roomId, io) => {
  if (!intervalIdTable.get(roomId)) {
    const intervalId = setInterval(() => {
      emitTimer(roomId, io)
    }, 1000)

    intervalIdTable.set(roomId, intervalId)
  }
}

const setRoomTimer = (roomId, io) => {
  initTimer(roomId, io)
}

module.exports = {
  setRoomTimer,
  clearRoomTimer,
}
