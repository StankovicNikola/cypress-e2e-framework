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
      login.login('standard_user', 'wrong_password')
      login.assertErrorVisible('Username and password do not match')
    })

    it('shows error for locked_out_user', () => {
      cy.fixture('users').then(({ lockedUser }) => {
        login.login(lockedUser.username, lockedUser.password)
        login.assertErrorVisible('Sorry, this user has been locked out')
      })
    })

    it('shows error when username is missing', () => {
      login.fillPassword('secret_sauce').submit()
      login.assertErrorVisible('Username is required')
    })

    it('shows error when password is missing', () => {
      login.fillUsername('standard_user').submit()
      login.assertErrorVisible('Password is required')
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
