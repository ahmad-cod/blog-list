const dummy = (blogs) => {
    return 1
  }

const totalLikes = (blogs) => {
    const likes = blogs.map(blog => blog.likes);
    if(likes.length === 1) {
        return likes[0]
    }else {
       return likes.reduce((total, val) => total + val)
    }
}

const favouriteBlog = (blogs) => {
    const likes = blogs.map(blog => blog.likes);
    const maxLikes = Math.max(...likes);
    const favBlog = blogs.find(blog => blog.likes === maxLikes)
    return favBlog
}

const mostLikes = (blogs) => {
    const likes = blogs.map(blog => blog.likes);
    const maxLikes = Math.max(...likes);
    const favBlog = blogs.find(blog => blog.likes === maxLikes)
    return {
        author: favBlog.author,
        likes: favBlog.likes
    } 
}
const mostBlogs = (bloggers) => {
    const blogs = bloggers.map(blogger => blogger.blogs);
    const maxBlogs = Math.max(...blogs);
    const favBlogger = bloggers.find(blogger => blogger.blogs === maxBlogs)
    return {
        author: favBlogger.author,
        blogs: favBlogger.blogs
    } 
}
  
  module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
    mostLikes,
    mostBlogs
  }