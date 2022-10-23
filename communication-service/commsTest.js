// Test
const io = require("socket.io-client");
const url = process.env.URL || "http://localhost:8004";
const socket = io.connect(url);
const message = "Hello Worldddd";
console.log("Start test.js ")
socket.on("connect", () => {
    console.log(`test connected with id: ${socket.id}`)
    sender = "Bob dylan"
    roomId = socket.id;
    socket.emit("incoming-message", message, sender, roomId);

    
})

console.log("End test.js ")
