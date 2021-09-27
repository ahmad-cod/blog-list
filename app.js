const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const blogRoutes = require('./controllers/blogs');
const userRoutes = require('./controllers/users');
const loginRoute = require('./controllers/login');
const jwt = require('jsonwebtoken')
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
 .then(() => logger.info('connected to MongoDB'))
 .catch(error => logger.error('error connection to MongoDB:', error.message))
 console.log('Mon', config.MONGODB_URI)
app.use(cors())
app.use(express.json())

app.use('/api/login', loginRoute)

app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)
app.use(middleware.userExtractor)
app.use('/api/blogs', blogRoutes)
app.use('/api/users', userRoutes)

if(process.env.NODE_ENV === 'production'){
  app.use(express.static('build'))
}
if(process.env.NODE_ENV == 'test'){
  const testingRoute = require('./controllers/testing')

  app.use('/api/testing', testingRoute)
}

app.use(middleware.unknownRoutes)
app.use(middleware.errorHandler)

module.exports = app