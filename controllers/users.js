const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
// const {hashPassword} = require('../utils/user_helper')

usersRouter.get('/', async (request, response) => {
    const users = await User.find({})
    response.json(users)
})

usersRouter.post('/', async (request, response) => {
    let passwordHash;
    const {username, name, password} = request.body

    const user = new User({
        username,
        name,
        password
    })

    const savedUser = await user.save()
    response.json(savedUser)
})

module.exports = usersRouter