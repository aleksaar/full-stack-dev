const blogsRouter = require('express').Router()
const Blog = require('../models/blog')


blogsRouter.get('/', (request, response) => {
    Blog
        .find({})
        .then(blogs => {
        response.json(blogs)
        })
})

blogsRouter.post('/', async (request, response, next) => {
    const blog = new Blog(request.body)

    try {
        const saved = await blog.save()
        response.status(201).json(saved)
    }
    catch(exception) {
        next(exception)
    }
    
})

module.exports = blogsRouter