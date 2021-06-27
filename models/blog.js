const mongoose = require('mongoose');

const mongoUrl = 'mongodb://localhost/bloglist'
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const blogSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    author: String,
    url: {
      type: String,
      required: true
    },
    likes: Number,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  })

  blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

module.exports = mongoose.model('Blog', blogSchema)