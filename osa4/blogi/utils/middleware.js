const User = require('../models/user')
const jwt = require('jsonwebtoken')


const errorHandler = (error, request, response, next) => {
    console.log(error)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } 
    else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    } 
    else if (error.name === 'JsonWebTokenError') {
        return response.status(401).json({
            error: 'invalid token'
        })
    } 
    else if (error.name === 'TokenExpiredError') {
        return response.status(401).json({
            error: 'token expired'
        })
    }
  
    next(error)
  }

const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        request.token = authorization.substring(7)
    }
    else {
        request.token = null
    }
    next()
}

const userExtractor = async (request, response, next) => {
    if (request.method === 'GET' || request.method === 'PUT') {
        next()
    }
    else {
        const token = request.token
        if (token === null) {
            return response.status(401).json({ error: 'token missing or invalid' })
        }
        const decodedToken = jwt.verify(token, process.env.SECRET)
        if (!token || !decodedToken.id) {
            return response.status(401).json({ error: 'token missing or invalid' })
        }
        const user = await User.findById(decodedToken.id)

        request.user = user

        next()
    }
    
}

module.exports = { errorHandler, tokenExtractor, userExtractor }