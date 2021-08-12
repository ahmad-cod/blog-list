const jwt = require('jsonwebtoken')
const logger = require('./logger')

const requestLogger = (request, response, next) => {
  logger.info('Method: ', request.method)
  logger.info('Path: ', request.path)
  logger.info('Body: ', request.body)
  logger.info('...')
  next()
}

const unknownRoutes = (request, response, next) => {
  response.status(404).send({error: 'unknown endpoint'})
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if(error.name === 'CastError' && error.kind === 'ObjectId'){
    return response.status(400).send({error: 'malformatted id'})
  }else if(error.name === 'validationError'){
    return response.status(400).send({error: error.message})
  } else if(error.name === 'JsonWebTokenError'){
      return response.status(401).send({error: 'invalid token'})
  }

  next(error)
}

// const getTokenFrom = request => {
//   const authorization = request.get('authorization')
//   if(authorization && authorization.toLowerCase().startsWith('bearer ')){
//     return authorization.substring(7)
//   }
//   return null
// }

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
    requestLogger,
    unknownRoutes,
    errorHandler,
    userExtractor
}
