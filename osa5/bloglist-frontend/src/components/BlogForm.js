import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
    
    const [newTitle, setNewTitle] = useState('') 
    const [newAuthor, setNewAuthor] = useState('') 
    const [newUrl, setNewUrl] = useState('') 

    const handleTitleChange = (event) => {
        setNewTitle(event.target.value)
    }
    
    const handleAuthorChange = (event) => {
        setNewAuthor(event.target.value)
    }

    const handleUrlChange = (event) => {
        setNewUrl(event.target.value)
    }

    const addBlog = (event) => {
        event.preventDefault()
        createBlog ({
            title: newTitle,
            author: newAuthor,
            url: newUrl,
        })
        setNewTitle('')
        setNewAuthor('')
        setNewUrl('')
    }
    
    

    return(
        <div>
            <h2>Create a new blog</h2>
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
        </div>
    )
}

export default BlogForm