import { LoginPage } from '../pages/LoginPage'

declare global {
  namespace Cypress {
    interface Chainable {
      loginBySession(username: string, password: string): Chainable<void>
      clearCookiesAndStorage(): Chainable<void>
    }
  }
}

// Uses cy.session to cache login state and skip re-login between tests
Cypress.Commands.add('loginBySession', (username: string, password: string) => {
  cy.session(username, () => {
    const login = new LoginPage()
    login.visit()
    login.login(username, password)
    cy.url().should('include', '/inventory.html')
  })
})

Cypress.Commands.add('clearCookiesAndStorage', () => {
  cy.clearCookies()
  cy.clearLocalStorage()
  cy.clearAllSessionStorage()
})

export {}
