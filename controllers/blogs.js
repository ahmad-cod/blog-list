const router = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user')
const jwt = require('jsonwebtoken')

router.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', 'username name')
    
    response.json(blogs)
  })
router.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    
    response.json(blog)
  })
  
router.post('/', async (request, response) => {
  console.log(request.token)
  if(!request.token) {
    return response.status(401).json({error: 'token missing or invalid'})
  }
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if(!decodedToken.id){
    return response.status(401).json({error: 'token missing or invalid'})
  }
  console.log('decodedToken:', decodedToken)
  const user = await User.findById(decodedToken.id)

  const {title, url} = request.body
  if(!title || title === " ") response.status(400).end()
  if(!url || url === " ") response.status(400).end()

  console.log('user', user)
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

router.delete('/:id', async (request, response, next) => {
  if(!request.token) {
    return response.status(401).json({error: 'token missing or invalid'})
  }
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if(!decodedToken.id){
    return response.status(401).json({error: 'token missing or invalid'})
  }
  try {
    const blog = await Blog.findById(request.params.id)

    if (blog.user.toString() === decodedToken.id.toString()) {
      await blog.remove()
      response.status(204).end()
    } else {
      response.status(401).end()
    }
  } catch (exception) {
    next(exception)
  }
})

router.put('/:id', async (request, response) => {
  const { likes } = request.body
  console.log('likes', likes)
  // console.log('body', request.body)
  const blog = { likes }
  console.log('blog', blog)
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  return response.json(updatedBlog)
})

module.exports = router