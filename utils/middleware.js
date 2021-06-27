const jwt = require('jsonwebtoken')

const tokenExtractor = (request, response, next) => {
    const authorization = request.headers.authorization
    try {
        if(authorization && authorization.toLowerCase().startsWith('bearer ')){
            console.log('in the auth')
          request.token = authorization.substring(7)
          next()
        }
        request.token = null
        console.log('outside the auth')
        next()
    } catch (e) {
    console.log(e)
    }
    next()
  }

module.exports = {
    tokenExtractor
}