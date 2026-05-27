describe('Smoke suite', () => {
  it('homepage loads', () => {
    cy.visit('/')
    cy.title().should('not.be.empty')
  })

  it('login page is reachable', () => {
    cy.visit('/login')
    cy.get('[data-testid="login-submit"]').should('exist')
  })

  it('health check endpoint returns 200', () => {
    cy.request(`${Cypress.env('API_URL')}/health`).its('status').should('eq', 200)
  })
})
