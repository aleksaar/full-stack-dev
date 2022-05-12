import PropTypes from 'prop-types'
import Togglable from './Togglable'

const Blog = ({ blog, updateBlog, currentUserName, deleteBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const buttonStyle = {
    color: 'red',
  }

  const updateThisBlog = () => {
    updateBlog(blog.id, {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes+1,
      user: blog.user
    })
  }

  const deleteThisBlog = () => {
    deleteBlog(blog.title, blog.author, blog.id)
  }

  return(
    <div style={blogStyle}>
      {blog.title} - {blog.author}
      <Togglable buttonLabel='view' buttonLabel2='hide'>
        <p>{blog.url}</p>
        <p>likes: {blog.likes}<button onClick={updateThisBlog}>like</button></p>
        <p>Added by {blog.user.name}</p>
        { currentUserName === blog.user.username &&
          <button
            style={buttonStyle}
            onClick={deleteThisBlog}>
            delete
          </button>
        }
        <br></br>
      </Togglable>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  currentUserName: PropTypes.string.isRequired,
  deleteBlog: PropTypes.func.isRequired
}

export default Blog