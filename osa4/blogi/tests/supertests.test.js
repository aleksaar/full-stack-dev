const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const blog = require('../models/blog')
const api = supertest(app)

const Blog = require("../models/blog")
const helper = require('../utils/super_helper')


const initialBlogs = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0
    },
    {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0
    },
    {
      _id: "5a422b891b54a676234d17fa",
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
      __v: 0
    },
    {
      _id: "5a422ba71b54a676234d17fb",
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
      __v: 0
    },
    {
      _id: "5a422bc61b54a676234d17fc",
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      __v: 0
    }  
]
  
beforeEach(async () => {
    await Blog.deleteMany({})
    let BlogObject = new Blog(initialBlogs[0])
    await BlogObject.save()
    BlogObject = new Blog(initialBlogs[1])
    await BlogObject.save()
    BlogObject = new Blog(initialBlogs[2])
    await BlogObject.save()
    BlogObject = new Blog(initialBlogs[3])
    await BlogObject.save()
    BlogObject = new Blog(initialBlogs[4])
    await BlogObject.save()
    BlogObject = new Blog(initialBlogs[5])
    await BlogObject.save()
})


test('Blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('All blogs returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(initialBlogs.length)
})

test('id field', async () => {
  const response = await api.get('/api/blogs')
  
  expect(response.body[0].id).toBeDefined()
})

test('blog added', async () => {
  const newBlog = {
    title: 'Test',
    author: 'Tester',
    url: 'localhost',
    likes: 9999,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)


  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(initialBlogs.length + 1)

  const titles = blogsAtEnd.map(n => n.title)
  expect(titles).toContain('Test')
})


describe('likes', () => {
  const newBlog = {
    title: 'Test',
    author: 'Tester',
    url: 'localhost',
    likes: 9999,
  }

  const newBlog2 = {
    title: 'Test2',
    author: 'Tester2',
    url: 'localhost',
  }

  test('likes given', async () => {
    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd[initialBlogs.length].likes).toBe(9999)
  })

  test('no likes given', async () => {
    await api
    .post('/api/blogs')
    .send(newBlog2)
    .expect(201)
    .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd[initialBlogs.length].likes).toBe(0)
  })

})

describe('title and url required', () => {
  const newBlog = {
    author: 'Tester',
    url: 'localhost',
    likes: 9999,
  }

  const newBlog2 = {
    title: 'Test',
    author: 'Tester',
    likes: 9999,
  }

  test('no title', async () => {
    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
  })

  test('no url', async () => {
    await api
    .post('/api/blogs')
    .send(newBlog2)
    .expect(400)
  })

})

describe('delete', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(initialBlogs.length - 1)

    const titles = blogsAtEnd.map(r => r.title)

    expect(titles).not.toContain(blogToDelete.title)
  })
})

test.only('modify likes', async () => {
  const newBlog = {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7777,
  }

  const id = "5a422a851b54a676234d17f7"
  await api
    .put(`/api/blogs/${id}`)
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd[0].likes).toBe(7777)
})

afterAll(() => {
  mongoose.connection.close()
})