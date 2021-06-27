const jwt = require('jsonwebtoken')

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7)
  }
    next()
  }

const userExtractor = (request, response, next) => {
  if(request.token){
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if(decodedToken){
      request.user = decodedToken
      console.log(request.user.toString())
    }
  }
  next()
}

module.exports = {
    tokenExtractor,
    userExtractor
}
