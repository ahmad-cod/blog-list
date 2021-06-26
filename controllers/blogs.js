const router = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getToken = request => {
  const authorization = request.get('authorization')
  if(authorization && authorization.toLowerCase().startsWith('bearer ')){
    return authorization.substring(7)
  }
  return null
}

router.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', 'username name')
    
    response.json(blogs)
  })
router.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    
    response.json(blog)
  })
  
router.post('/', async (request, response) => {
  const token = getToken(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if(!token || !decodedToken.id){
    return response.status(401).json({error: 'token missing or invalid'})
  }
  const user = await User.findById(decodedToken.id)

  const {title, url} = request.body
  if(!title || title === " ") response.status(400).end()
  if(!url || url === " ") response.status(400).end()

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