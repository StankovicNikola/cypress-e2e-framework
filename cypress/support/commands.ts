declare global {
  namespace Cypress {
    interface Chainable {
      loginByApi(email: string, password: string): Chainable<void>
      loginByUi(email: string, password: string): Chainable<void>
      clearCookiesAndStorage(): Chainable<void>
    }
  }
}

Cypress.Commands.add('loginByApi', (email: string, password: string) => {
  cy.request({
    method: 'POST',
    url: `${Cypress.env('API_URL')}/auth/login`,
    body: { email, password },
  }).then(({ body }) => {
    window.localStorage.setItem('auth_token', body.token)
    cy.setCookie('session', body.sessionId)
  })
})

Cypress.Commands.add('loginByUi', (email: string, password: string) => {
  cy.visit('/login')
  cy.get('[data-testid="email-input"]').type(email)
  cy.get('[data-testid="password-input"]').type(password, { log: false })
  cy.get('[data-testid="login-submit"]').click()
  cy.url().should('include', '/dashboard')
})

Cypress.Commands.add('clearCookiesAndStorage', () => {
  cy.clearCookies()
  cy.clearLocalStorage()
  cy.clearAllSessionStorage()
})

export {}
