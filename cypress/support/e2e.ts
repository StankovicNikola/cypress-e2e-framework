import './commands'

before(() => {
  cy.log(`Environment: ${Cypress.env('ENV') ?? 'default'}`)
})

beforeEach(() => {
  cy.clearCookiesAndStorage()
})

Cypress.on('uncaught:exception', (err) => {
  // Don't fail tests on third-party script errors
  if (err.message.includes('ResizeObserver loop')) return false
})
