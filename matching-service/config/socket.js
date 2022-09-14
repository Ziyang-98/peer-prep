const { Server } = require("socket.io");
const { setRoomTimeout, clearRoomTimeout } = require('../utils/timeoutHelper')

const Match = require('../model/matchModel')

const connectSocket = (httpServer, options) => {
  const io = new Server(httpServer, options);

  io.on("connection", (socket) => {
    console.log("a user connected");
  
    socket.on("matchWaiting", (data) => {
      const { room } = data;
      socket.join(room);
  
      setRoomTimeout(room, socket);
    });
  
    socket.on("matchFound", (data) => {
      const { room } = data;
  
      clearRoomTimeout(room);
  
      socket.join(room);
      io.to(room).emit("room", { room });
    });
  
    socket.on("disconnecting", async () => {
      console.log("a user is disconnecting");
  
      for (const room of socket.rooms.values()) {
        const roomSplit = room.split('-')
        
        if (roomSplit[0] === 'match') {
            const match = await Match.findOne({ room })
    
            if (match) {
                await match.remove()
                return
            }
        }
      }
    });
  
    socket.on("disconnect", () => {
      console.log("a user disconnected");
    });
  
    socket.on("message", (data) => {
      console.log(data.msg);
    });
  });  
}

module.exports = connectSocket
