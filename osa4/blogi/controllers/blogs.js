const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
    const user = request.user

    const body = request.body

    if (body.title === undefined || body.url === undefined) {
        return response.status(400).json({
            error: 'missing title or url'
        })
    }

    const blog = new Blog ({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id
    })
    
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)    
})

blogsRouter.delete('/:id', async (request, response) => {
    const user = request.user

    const blog = await Blog.findById(request.params.id)
    if (blog === null) {
        return response.status(400).json({ error: 'id does not exist' })
    }

    if (user._id.toString() === blog.user.toString()) {
        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
    }
    else {
        return response.status(403).json({ error: 'users do not match' })
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

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(updatedBlog)
})

module.exports = blogsRouter