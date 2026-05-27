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
  cy.session(
    username,
    () => {
      cy.visit('/')
      cy.get('[data-test="username"]').type(username)
      cy.get('[data-test="password"]').type(password, { log: false })
      cy.get('[data-test="login-button"]').click()
      cy.url().should('include', '/inventory.html')
    },
    {
      validate() {
        cy.visit('/inventory.html')
        cy.url().should('include', '/inventory.html')
      },
    },
  )
})

Cypress.Commands.add('clearCookiesAndStorage', () => {
  cy.clearCookies()
  cy.clearLocalStorage()
  cy.clearAllSessionStorage()
})

export {}
