const blog = require("../models/blog")

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, blog) => {
        return sum + blog.likes
    }
    return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    if (blogs == null) {
        return null
    }
    const reducer = (maxBlog, blog) => {
        if (blog.likes > maxBlog.likes) {
            return blog
        }
        else {
            return maxBlog
        }
    }
    return blogs.reduce(reducer, blogs[0])
}

const mostBlogs = (blogs) => {
    if (blogs == null) {
        return null
    }
    let dict = {}
    blogs.forEach(blog => {
        if (blog.author in dict) {
            dict[blog.author] += 1
        }
        else {
            dict[blog.author] = 1
        }
    })
    const sorted = Object.keys(dict).sort((a, b) => {
        return dict[b] - dict[a]
    })

    const maxAuthor = sorted[0]
    const maxCount = dict[maxAuthor]

    return {
        "author": maxAuthor,
        "blogs": maxCount
    }

}

const mostLikes = (blogs) => {
    if (blogs == null) {
        return null
    }
    let dict = {}
    blogs.forEach(blog => {
        if (blog.author in dict) {
            dict[blog.author] += blog.likes
        }
        else {
            dict[blog.author] = blog.likes
        }
    })
    const sorted = Object.keys(dict).sort((a, b) => {
        return dict[b] - dict[a]
    })

    const maxAuthor = sorted[0]
    const maxLikes = dict[maxAuthor]

    return {
        "author": maxAuthor,
        "likes": maxLikes
    }

}

  
module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}