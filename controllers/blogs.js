const router = require('express').Router();
const Blog = require('../models/blog');

router.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    
    response.json(blogs)
  })
router.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    
    response.json(blog)
  })
  
router.post('/', async (request, response) => {
  const {title, url} = request.body
  if(!title || title === " ") response.status(400).end()
  if(!url || url === " ") response.status(400).end()

  const likes = request.body.likes || 0

  const blog = new Blog({...request.body, likes})

  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

router.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

router.put('/:id', async (request, response) => {
  const { likes } = request.body
  const blog = { likes }
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(updatedBlog)
})

module.exports = router