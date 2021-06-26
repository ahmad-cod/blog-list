const bcrypt = require('bcrypt')
const User = require('../models/user')
const supertest = require('supertest')
const app = require('../app')
const {hashPassword} = require('../utils/user_helper')
const mongooseUniqueValidator = require('mongoose-unique-validator')
jest.useFakeTimers()

const api = supertest(app)

describe('create a user', () => {
    beforeEach(async () => {
        await User.deleteMany()
    })
    test('creates new user successfully', async () => {
        let passwordHash;
        const newUser = {
            username: 'hasan1',
            name: 'Hasan Jumuah'
        }
        hashPassword('sekret').then(hashed => {
            passwordHash = hashed
        })
        await api.post('/api/users').send({...newUser, passwordHash}).expect(200)
    })
    afterAll(() => {
        mongoose.connection.close()
    })
})