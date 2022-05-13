/* eslint-disable no-undef */
describe('Blog app', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/testing/reset')
      cy.visit('http://localhost:3000')

      const user = {
        name: 'Test Man',
        username: 'tester',
        password: 'password'
      }
      cy.request('POST', 'http://localhost:3003/api/users/', user) 
    })
  
    it('Login form is shown after click', function() {
      cy.contains('login').click()
      cy.get('#username').type('tester')
      cy.get('#password').type('paaaassssss')
    })

    it('failed login', function() {
      cy.contains('login').click()
      cy.get('#username').type('tester')
      cy.get('#password').type('paaaassssss')
      cy.get('#submitLogin').click()

      cy.contains('wrong credentials')
    })

    it('successful login', function() {
      cy.contains('login').click()
      cy.get('#username').type('tester')
      cy.get('#password').type('password')
      cy.get('#submitLogin').click()

      cy.contains('Test Man logged in')
    })

    describe('when logged in', function() {
      beforeEach(function() {
        cy.contains('login').click()
        cy.get('#username').type('tester')
        cy.get('#password').type('password')
        cy.get('#submitLogin').click()
      })
  
      it('a new blog can be created', function() {
        cy.contains('new blog').click()
        cy.get('#title').type('Blog Title')
        cy.get('#author').type('Blog Author')
        cy.get('#url').type('blogurl.com')
        cy.contains('create').click()

        cy.contains('Blog Title')
        cy.contains('Blog Author')
        cy.contains('blogurl.com')
      })

      describe('and 2 blogs exist', function() {
        beforeEach(function () {
          cy.contains('new blog').click()
          cy.get('#title').type('test0')
          cy.get('#author').type('test author0')
          cy.get('#url').type('test url0')
          cy.contains('create').click()

          cy.get('#title').type('test')
          cy.get('#author').type('test author')
          cy.get('#url').type('test url')
          cy.contains('create').click()
        })

        it('blog can be liked', function() {
          cy.contains('test - test author')
            .parent()
            .contains('view')
            .click()

          cy.contains('test - test author')
            .parent()
            .contains('like')
            .click()

          cy.contains('test - test author')
            .parent()
            .contains('likes: 1')
        })

        it('blog can be deleted', function() {
          cy.contains('test - test author')
            .parent()
            .contains('view')
            .click()

          cy.contains('test - test author')
            .parent()
            .contains('like')
            .click()

          cy.contains('test - test author')
           .parent()
            .contains('delete')
            .click()

          cy.get('test - test author').should('not.exist')
        })

        it('sorted correctly', function() {
          cy.contains('new blog').click()
          cy.get('#title').type('test2')
          cy.get('#author').type('test author2')
          cy.get('#url').type('test url2')
          cy.contains('create').click()

          cy.contains('test0 - test author0')
          .parent()
          .contains('view')
          .click()

          cy.contains('test - test author')
          .parent()
          .contains('view')
          .click()

          cy.contains('test - test author')
          .parent()
            .contains('like')
            .click()

          cy.contains('test2 - test author2')
          .parent()
            .contains('view')
            .click()

          cy.contains('test2 - test author2')
          .parent()
            .contains('like')
            .click()

          cy.contains('test2 - test author2')
            .parent()
            .contains('likes: 1')

          cy.contains('test2 - test author2')
            .parent()
            .contains('like')
            .click()

          cy.contains('test0 - test author0')
            .parent()
            .contains('likes: 0')
          
          cy.contains('test - test author')
            .parent()
            .contains('likes: 1')

          cy.contains('test2 - test author2')
            .parent()
            .contains('likes: 2')
          
          cy.get('.blogTitleAuthor').eq(0).should('contain', 'test2 - test author2')
          cy.get('.blogTitleAuthor').eq(1).should('contain', 'test - test author')
          cy.get('.blogTitleAuthor').eq(2).should('contain', 'test0 - test author0')

        })

      })
     
    })

  })