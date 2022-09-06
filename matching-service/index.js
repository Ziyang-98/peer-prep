// Express
const express = require('express')
const cors = require('cors')
const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors()) // config cors so that front-end can use
app.options('*', cors())

// Routes
app.get('/', (req, res) => {
    res.send('Hello World from matching-service')
})

const Match = require('./models/Match')

app.get('/matches', async (req, res) => {
    const matches = await Match.findAll()
    res.send(matches)
})

app.get('/match/:id', async (req, res) => {
    const id = req.params.id
    const match = await Match.findOne({ where: { id }})
    res.send(match)
})

app.put('/match/:id', async (req, res) => {
    const id = req.params.id
    const match = await Match.findOne({ where: { id }})
    match.status = req.body.status
    await match.save()
    res.send('updated!')
})

app.delete('/match/:id', async (req, res) => {
    const id = req.params.id
    const numOfRowDeleted = await Match.destroy({ where: { id }})

    if (numOfRowDeleted === 0) {
        res.json({ msg: 'No match is deleted'})
    } else {
        res.status(200).json({ msg: `Match ${id} deleted successfully!`})
    }
})

app.post('/match', async (req, res) => {
    const { difficulty, username } = req.body
    // TODO: validate input
    const match = await Match.findOne({ where: { difficulty }})
    
    if (match) {
        const room = match.room
        await match.destroy()
        res.status(200).json({ msg: 'Match found!', id: match.id, room, isMatch: true })
    } else {
        const { v4 } = require('uuid')
        const room = `${difficulty}-${v4()}`
        const newMatch = {
            difficulty,
            username,
            room
        }

        const newMatchInstance = await Match.create(newMatch)
        const id = newMatchInstance.get('id')
        res.status(200).json({ msg: 'Finding a match for you!', id, room, isMatch: false })
    }
})

// Database
const db = require('./db')

db.sync({ force: true }) // TODO: need to remove this when in production
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
const timeoutTable = new Map()

io.on('connection', (socket) => {
    console.log('a user connected')

    socket.on('matchWaiting', data => {
        const { room } = data
        socket.join(room)

        const timeoutId = setTimeout(() => {
            socket.emit('failToMatch', { msg: "Sorry! We can't find a match at this time." })
        }, 30000)
        timeoutTable.set(room, timeoutId)
    })

    socket.on('matchFound', data => {
        const { room } = data
        
        clearTimeout(timeoutTable.get(room))
        timeoutTable.delete(room)

        socket.join(room)
        io.to(room).emit('room', { room })
    })

    socket.on('disconnect', () => {
        console.log('a user disconnected')
    })

    socket.on('message', (data) => {
        console.log(data.msg)
    })
})
