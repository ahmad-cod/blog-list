const express = require('express')
const app = express()
const cors = require('cors')
const blogRoutes = require('./controllers/blogs');
const userRoutes = require('./controllers/users');


app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogRoutes)
app.use('/api/users', userRoutes)

module.exports = app