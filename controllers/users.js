const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
// const {hashPassword} = require('../utils/user_helper')

usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs')
    response.json(users)
})

usersRouter.post('/', async (request, response) => {
    // await User.deleteMany()
    let passwordHash;
    const {username, name, password} = request.body
    if(username.length < 3) return response.status(400).json({error: 'username is required with a minimum length of 3'})
    if(password.length < 3) return response.status(400).json({error: 'input password with a minimum amount of 3 characters'})

    const user = new User({
        username,
        name,
        password
    })

    const savedUser = await user.save()
    response.json(savedUser)
})

module.exports = usersRouter