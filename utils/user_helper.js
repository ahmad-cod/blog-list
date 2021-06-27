const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const bcrypt = require('bcrypt')

const hashPassword = async (password, saltRounds = 10) => {
    try {
        // Generate a salt
        const salt = await bcrypt.genSalt(saltRounds);

        // Hash password
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword
    } catch (error) {
        console.log(error);
    }

    // Return null if error
    return null;
};

hashPassword('test123').then(hashed => {
    console.log(hashed)
})
const show = async () => {
    const res = await hashPasssword('qwerty') 
    return res
}

console.log(show())
module.exports = {
    hashPassword
}