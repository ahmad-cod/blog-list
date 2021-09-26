const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/user')
const router = require('express').Router()

router.post('/', async (req, res) => {
    const {username, password} = req.body

    try {
        // const users = await User.find({})
        const user = await User.findOne({ username })
        if(!user) return res.status(400).json({error: 'invalid username or password'})
        console.log('username', username)
        
        const passwordCompare = await bcrypt.compare(password, user.password)
        console.log('comparison', passwordCompare)
        const passwordCorrect = user === null ? false : passwordCompare
        // console.log('secret', process.env.SECRET)
        console.log(user)
        console.log(passwordCorrect, password)
        if(!passwordCorrect){
            console.log('invalid username or password')
            return res.status(400).json({error: 'invalid username or password'})
        }
        const userForToken = {
            username: user.username,
            id: user._id
        }
        console.log(userForToken)
        const token = jwt.sign(userForToken, process.env.SECRET)
        res.status(200).send({token, username, name: user.name})
    }catch(exception) {
        console.log(exception)
    }
    // console.log(password, user.password)
    
})

module.exports = router