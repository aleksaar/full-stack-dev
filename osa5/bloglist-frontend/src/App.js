import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort((a, b) => b.likes - a.likes) )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      setUser(user)
      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      setMessage(`${user.name} logged in`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      setUsername('')
      setPassword('')
    } 
    catch (exception) {
      setIsError(true)
      setMessage('wrong credentials')
      setTimeout(() => {
        setMessage(null)
        setIsError(false)
      }, 5000)
    }
  }

  const logout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const addBlog = async (blogObject) => {
    try {
        const returnedBlog = await blogService.create(blogObject)
        const newBlogs = blogs.concat(returnedBlog)
        setBlogs(newBlogs.sort((a, b) => b.likes - a.likes))

        setMessage(`a new blog "${returnedBlog.title}" by ${returnedBlog.author} added`)
        setTimeout(() => {
            setMessage(null)
        }, 5000)
    }
    catch (exception) {
        setIsError(true)
        setMessage(exception.message)
        setTimeout(() => {
          setMessage(null)
          setIsError(false)
        }, 5000)
    }  
  }

  const updateBlog = async (id, blogObject) => {
    try {
      const returnedBlog = await blogService.update(id, blogObject)
      const newBlogs = await blogService.getAll()
      setBlogs(newBlogs.sort((a, b) => b.likes - a.likes))

      setMessage(`blog "${returnedBlog.title}" likes increased, blogs sorted`)
      setTimeout(() => {
          setMessage(null)
      }, 5000)
    }
    catch (exception) {
        setIsError(true)
        setMessage(exception.message)
        setTimeout(() => {
        setMessage(null)
        setIsError(false)
        }, 5000)
    }  
  }

  const removeBlog = async (title, author, id) => {
    if (window.confirm(`Remove ${title} by ${author}?`)) {
      try {
        await blogService.remove(id)
        const newBlogs = blogs.filter(b => b.id !== id)
        setBlogs(newBlogs.sort((a, b) => b.likes - a.likes))

        setMessage(`${title} by ${author} removed`)
        setTimeout(() => {
            setMessage(null)
        }, 5000)
      }
      catch (exception) {
          setIsError(true)
          setMessage(exception.message)
          setTimeout(() => {
          setMessage(null)
          setIsError(false)
          }, 5000)
      }  
    }
  }

  return (
    <div>
      <Notification message={message} isError={isError}/>

      {user === null ? 
        <Togglable buttonLabel='login' buttonLabel2='cancel'>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleLogin={handleLogin}
          />
        </Togglable> :
        <div>
          <p>{user.name} logged in</p>
          <button onClick={logout}>log out</button>
          <Togglable buttonLabel='new blog' buttonLabel2='cancel'>
            <BlogForm
              createBlog={addBlog}
            />
          </Togglable>
          
      </div>
      }
      <h2>blogs</h2>
      {blogs.map(blog =>
            <Blog key={blog.id} 
              blog={blog} 
              updateBlog={updateBlog} 
              currentUser={user} 
              deleteBlog={removeBlog}
              />
      )}
    </div>
  )
}

export default App