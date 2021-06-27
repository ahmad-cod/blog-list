const express = require('express')
const app = express()
const cors = require('cors')
const blogRoutes = require('./controllers/blogs');
const userRoutes = require('./controllers/users');
const loginRoute = require('./controllers/login');
const {tokenExtractor} = require('./utils/middleware')


app.use(cors())
app.use(express.json())

app.use('/api/login', loginRoute)
app.use(tokenExtractor)
app.use('/api/blogs', blogRoutes)
app.use('/api/users', userRoutes)

module.exports = app