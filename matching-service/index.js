const express = require("express");
const cors = require("cors");
const { errorHandler } = require('./middleware/errorMiddleware')
require('dotenv').config()
const connectDB = require('./config/db')
const { createServer } = require("http");
const connectSocket = require('./config/socket')

// Database
connectDB()

// Express
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors()); // config cors so that front-end can use
app.options("*", cors());

// Routes
app.get("/", (req, res) => {
  res.send("Hello World from matching-service")
})
app.use('/api/matchService/match', require('./routes/matchRoutes'))

// Error handling
app.use(errorHandler)

// HTTP server
const httpServer = createServer(app);
const PORT = process.env.PORT || 8001;

httpServer.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});

// Socket.io server
connectSocket(httpServer, { cors: true })
