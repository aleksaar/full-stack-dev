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

blogsRouter.delete('/:id', async (request, response, next) => {
    try {
      await Blog.findByIdAndRemove(request.params.id)
      response.status(204).end()
    } 
    catch (exception) {
      next(exception)
    }
})

blogsRouter.put('/:id', async (request, response, next) => {
    const body = request.body
  
    const blog = {
        author: body.author,
        title: body.title,
        likes: body.likes,
        url: body.url
    }

    try {
        const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
        response.json(updatedBlog)
    }
    catch (exception) {
        next(exception)
      }
})

module.exports = blogsRouter