const express = require('express')
const cors = require('cors')
const { createServer } = require('http')

const { errorHandler } = require('./middleware/errorMiddleware')
const { connectCache } = require('./config/cache')

// Express
const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())
app.options('*', cors())

// Routes
app.get('/', (req, res) => {
  res.send({ message: 'Welcome to Question Service!' })
})
app.use('/api/questionService/question', require('./routes/questionRoutes'))

// Error handling
app.use(errorHandler)

// Redis Cache
connectCache()

// HTTP Server
const httpServer = createServer(app)
const PORT = 8003

httpServer.listen(PORT, () => console.log(`listening on port ${PORT}`))
