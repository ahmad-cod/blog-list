const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const { response } = require('express')
const router = require('express').Router()

router.post('/', async (req, res) => {
    const {username, password} = req.body
    const user = await User.findOne({ username })
    console.log(password, user.password)
    const passwordCorrect = user === null ? false : await bcrypt.compare(password, user.password)
    console.log('secret', process.env.SECRET)
    console.log(passwordCorrect)
    if(!(user && passwordCorrect)){
        return response.status(400).json({error: 'invalid username or password'})
    }

    const userForToken = {
        username: user.username,
        id: user._id
    }
    console.log(userForToken)
    const token = jwt.sign(userForToken, process.env.SECRET)
    res.status(200).send({token, username, name: user.name})
})

module.exports = router