const express = require('express')
const app = express()
const cors = require('cors')
const blogRoutes = require('./controllers/blogs');


app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogRoutes)

module.exports = app