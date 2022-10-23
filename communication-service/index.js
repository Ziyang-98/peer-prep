require("dotenv").config();
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 8004
const http = require('http').createServer(app);

const STATUS_CODE_SUCCESS  = 200
const  PREFIX_COMMUNICATION_SVC = '/api/communication/'
const io = require('socket.io')(http, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  },
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', (req, res) => {
  res.status(STATUS_CODE_SUCCESS).json({status: 'success', data: 'Chat Microservice is running.'})
})

app.get(PREFIX_COMMUNICATION_SVC, (req, res) => 
  res.status(STATUS_CODE_SUCCESS).json({status: 'success', data: 'Chat microservice is working!'}));

io.on('connection', socket => {
  console.log(`you connected with id: ${socket.id}`);
  socket.on('incoming-message', (message, sender, roomId) => {
    console.log(`incoming message received: ${message}`)
    console.log(`incoming message roomId: ${roomId}`)
    console.log(`incoming message sender: ${sender}`)
    if (roomId === "") {
      console.log("missing room ID")
    } else {
      console.log("emitting")
      io.emit(roomId, message)
    }
  })
})

http.listen(port, () => {
  console.log(`Message ms listening to port ${port}`);
})





module.exports = http;


