const io = require("socket.io-client");
const url = process.env.URL || "http://localhost:8004";
const socket = io.connect(url);
const {
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers,
  } = require("./utils/chatUsers");


const message = "Hello World from client";
const username = "Bob dylan";
const roomId = "1234"; 
socket.emit('joinRoom', {username, roomId});

// Get room and users
socket.on('roomUsers', ({ roomId, users }) => {
    console.log(`This is the output roomId: ${roomId}`)
    for (let i = 0; i < users.length; i++) {
        console.log(`This is the username: ${users[i].username}`)
      }
  });

 // Message from server 
socket.on('message', message => {
    console.log("client side message");
    console.log(message.username);
    console.log(message.text);
    console.log(message.time);
});

//emit message to server
socket.emit('chatMessage', message)

/** 
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

socket.on('incoming-message', ({ message }) => {
    console.log(`outgoiingg message received: ${message}`)
  });

console.log("End test.js ")
*/