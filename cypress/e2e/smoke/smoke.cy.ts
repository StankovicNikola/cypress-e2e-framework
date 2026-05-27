import { LoginPage } from '../../pages/LoginPage'
import { InventoryPage } from '../../pages/InventoryPage'

const login = new LoginPage()
const inventory = new InventoryPage()

describe('Smoke', () => {
  it('login page loads', () => {
    login.visit()
    login.assertLoginButtonVisible()
  })

  it('inventory is accessible after login', () => {
    cy.fixture('users').then(({ standardUser }) => {
      cy.loginBySession(standardUser.username, standardUser.password)
      inventory.goto()
      inventory.assertLoaded()
    })
  })
})
