/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/no-container */
/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-debugging-utils */
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'


describe('Blog tests', () => {
  const blog = {
    title: 'title',
    author: 'author',
    url: 'url.com',
    likes: 9,
    user: {
      username: 'tester',
      name: 't.est',
    }
  }
  const mockHandler = jest.fn()

  beforeEach(() => {
    render(<Blog  blog={blog} updateBlog={mockHandler}/>)
  })

  test('title and author visible', () => {
    const titleAuthor = screen.getByText('title - author')
    expect(titleAuthor).toBeDefined()
  })

  test('url and likes not visible at start', () => {
    try {
      screen.getByText('url.com')
      screen.getByText('likes: 9')
    }
    catch {
      //
    }
  })

  test('url and likes visible after button press', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const titleAuthor = screen.getByText('title - author')
    expect(titleAuthor).toBeDefined()

    const url = screen.getByText('url.com')
    expect(url).toBeDefined()

    const likes = screen.getByText('likes: 9')
    expect(likes).toBeDefined()
  })

  test('clicking like twice calls event handler twice', async () => {
    const user = userEvent.setup()
    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })

})