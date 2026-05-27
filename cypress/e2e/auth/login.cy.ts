import { LoginPage } from '../../pages/LoginPage'
import { InventoryPage } from '../../pages/InventoryPage'

const login = new LoginPage()
const inventory = new InventoryPage()

describe('Login', () => {
  beforeEach(() => {
    cy.clearCookiesAndStorage()
    login.visit()
  })

  context('Valid credentials', () => {
    it('standard_user logs in and lands on inventory', () => {
      cy.fixture('users').then(({ standardUser }) => {
        login.login(standardUser.username, standardUser.password)
        inventory.assertLoaded()
      })
    })

    it('performance_glitch_user eventually logs in', () => {
      cy.fixture('users').then(({ glitchUser }) => {
        login.login(glitchUser.username, glitchUser.password)
        inventory.assertLoaded()
      })
    })
  })

  context('Invalid credentials', () => {
    it('shows error for wrong password', () => {
      cy.fixture('users').then(({ standardUser }) => {
        login.login(standardUser.username, 'wrong_password')
        login.assertErrorVisible('Username and password do not match')
      })
    })

    it('shows error for locked_out_user', () => {
      cy.fixture('users').then(({ lockedUser }) => {
        login.login(lockedUser.username, lockedUser.password)
        login.assertErrorVisible('Sorry, this user has been locked out')
      })
    })

    it('shows error when username is missing', () => {
      cy.fixture('users').then(({ standardUser }) => {
        login.fillPassword(standardUser.password).submit()
        login.assertErrorVisible('Username is required')
      })
    })

    it('shows error when password is missing', () => {
      cy.fixture('users').then(({ standardUser }) => {
        login.fillUsername(standardUser.username).submit()
        login.assertErrorVisible('Password is required')
      })
    })
  })

  context('Session', () => {
    it('preserves session on page reload', () => {
      cy.fixture('users').then(({ standardUser }) => {
        login.login(standardUser.username, standardUser.password)
        inventory.assertLoaded()
        cy.reload()
        inventory.assertLoaded()
      })
    })

    it('logs out and redirects to login page', () => {
      cy.fixture('users').then(({ standardUser }) => {
        login.login(standardUser.username, standardUser.password)
        inventory.logout()
        cy.url().should('eq', Cypress.config().baseUrl + '/')
      })
    })
  })
})
