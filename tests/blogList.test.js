const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')


beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

const api = supertest(app)
describe('blog lists', () => {
test('blog lists are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('correct amount of blogs is returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(3)
})

test('verify that the unique identifier property of the blog posts is named id', async () => {
  jest.setTimeout(20000)
  const response = await api.get('/api/blogs/5a422bc61b54a676234d17fc')
  console.log(response.body.title)
  console.log(response.text)
  expect(response.body.id).toBeDefined()
})

test('successful save of new blog', async () => {
  jest.setTimeout(20000)
  const newBlog = {
    title: "Who harms architecture",
    author: "Olamide C. Ayo",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0
  }
  await api.post('/api/blogs').send(newBlog).expect(201)
  .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const titles = response.body.map(res => res.title)
  expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
  expect(titles).toContain("Who harms architecture")
})

jest.setTimeout(40000)
test('if likes property is missing from request it defaults to the value 0', async () => {  
  const newBlog = {
    title: "Who harms architecture",
    author: "Olamide C. Ayo",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html"
  }
  const response = await api.post('/api/blogs').send(newBlog).expect(201)
  .expect('Content-Type', /application\/json/)
  // console.log(response.body)
  expect(response.body.likes).toBe(0)
})

test('if title and url are missing, responds with status code 400 Bad Request', async () => {
  const newBlog = {
    title: " ",
    url: "",
    author: "Olamide C. Ayo",
    likes: 0
  }
  await api.post('/api/blogs').send(newBlog).expect(400)
  
})

test('blog successfully deletes', async () => {
  await api.delete('/api/blogs/60d61e76b1483d036833bbc0').expect(204)
})

test.only('blog successfully updates', async () => {
  const blog = {
    likes: 23
  }
  const response = await api.put('/api/blogs/5a422bc61b54a676234d17fc').send(blog)

  expect(response.body.likes).toBe(23)
})

afterAll(() => {
  mongoose.connection.close()
})
})