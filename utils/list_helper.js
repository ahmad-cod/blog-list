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
  
  module.exports = {
    dummy,
    totalLikes
  }