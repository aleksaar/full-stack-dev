import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [isError, setIsError] = useState(false)
  const [newTitle, setNewTitle] = useState('') 
  const [newAuthor, setNewAuthor] = useState('') 
  const [newUrl, setNewUrl] = useState('') 


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
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

  const loginForm = () => (
    <div>
      <h2>Log in</h2>
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>    
    </div>  
  )

  const logout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const addBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    }

    try {
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))

      setMessage(`a new blog "${newTitle}" by ${newAuthor} added`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)

      setNewTitle('')
      setNewAuthor('')
      setNewUrl('')
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

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  const blogForm = () => (
    <form onSubmit={addBlog}>
      Title:<input
        value={newTitle}
        onChange={handleTitleChange}
      />
      <br></br>
      Author:<input
        value={newAuthor}
        onChange={handleAuthorChange}
      />
      <br></br>
      Url:<input
        value={newUrl}
        onChange={handleUrlChange}
      />
      <br></br>
      <button type="submit">create</button>
    </form>  
  )

  const blogList = () => (
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged in</p>
      <button onClick={logout}>log out</button>
      <h2>create new blog</h2>
      {blogForm()}
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

  return (
    <div>
      <Notification message={message} isError={isError}/>

      {user === null ? loginForm() : blogList()}

      
    </div>
  )
}

export default App