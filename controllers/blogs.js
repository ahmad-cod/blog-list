const router = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

router.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', 'username name')
    
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

  const user = await User.findById('60d76ea522581f1a3824c31b')
  console.log(user)
  const likes = request.body.likes || 0

  const blog = new Blog({
    ...request.body,
    likes,
    user: user._id
  })

  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

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