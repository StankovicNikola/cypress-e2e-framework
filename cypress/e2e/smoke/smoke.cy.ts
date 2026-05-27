describe('Smoke', () => {
  it('login page loads', () => {
    cy.visit('/')
    cy.get('[data-test="login-button"]').should('be.visible')
  })

  it('inventory is accessible after login', () => {
    cy.loginBySession('standard_user', 'secret_sauce')
    cy.visit('/inventory.html')
    cy.get('.inventory_list').should('be.visible')
  })
})
