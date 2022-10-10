const timerTable = new Map()
const intervalIdTable = new Map()

const clearRoomTimer = (roomId) => {
  const intervalId = intervalIdTable.get(roomId)
  clearInterval(intervalId)
  timerTable.delete(roomId)
  intervalIdTable.delete(roomId)
}

const handleTimesUp = (roomId, io) => {
  clearRoomTimer(roomId)
  io.to(roomId).emit('timesUp', {
    message: 'Time is up! 30 minutes have passed!',
  })
}

const emitTimer = (roomId, io) => {
  let timer = timerTable.get(roomId)

  // Start timer at 30 mins
  if (timer === undefined) {
    timer = 1800000
  } else {
    timer -= 1000
  }
  if (timer < 0) {
    handleTimesUp(roomId, io)
  } else {
    io.to(roomId).emit('currentTime', {
      timer,
    })
    timerTable.set(roomId, timer)
  }
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
