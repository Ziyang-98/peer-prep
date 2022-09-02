import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors()) // config cors so that front-end can use
app.options('*', cors())

app.get('/', (req, res) => {
    res.send('Hello World from matching-service');
});
// Database
const db = require('./db')

db.sync({ force: true })
    .then(() => {
        console.log('Connection has been established successfully!')
    })
    .catch(error => console.error('Unable to connect to the database:', error))

// HTTP server
const { createServer } = require('http')
const httpServer = createServer(app)
const PORT = process.env.PORT || 8001

httpServer.listen(PORT, () => {
    console.log(`listening on ${PORT}`)
})

// Socket.io
const { Server } = require('socket.io')
const io = new Server(httpServer)

io.on('connection', (socket) => {
    console.log('a user connected')
    io.emit('new connection', 'someone new has connected!')

    socket.on('disconnect', () => {
        console.log('a user disconnected')
        io.emit('new disconnection', 'someone disconnected!')
    })

    socket.on('match', (data) => {
        // using the data, create a new match in database (validate data first)
        console.log(`${data.name} wants to create a new match`)
    })

    socket.on('message', (data) => {
        console.log(data.msg)
    })
})
