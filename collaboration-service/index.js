const express = require('express')
const cors = require('cors')
const { createServer } = require('http')

const { errorHandler } = require('./middleware/errorMiddleware')
const { connectCache } = require('./config/cache')
const connectSocket = require('./config/socket')

// Express
const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())
app.options('*', cors())

// Routes
app.get('/', (req, res) => {
  res.send({ message: 'Welcome to Collaboration Service!' })
})
app.use('/api/collaborationService/room', require('./routes/roomRoutes'))

// Error handling
app.use(errorHandler)

// Redis Cache
connectCache()

// HTTP Server
const httpServer = createServer(app)
const PORT = 8002

httpServer.listen(PORT, () => console.log(`listening on port ${PORT}`))

// Socket Server
connectSocket(httpServer, { cors: true })
