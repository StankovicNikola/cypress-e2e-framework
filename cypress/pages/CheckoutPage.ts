import { BasePage } from './BasePage'

export class CheckoutPage extends BasePage {
  constructor() {
    super('/checkout-step-one.html')
  }

  fillInfo(firstName: string, lastName: string, postalCode: string): this {
    if (firstName) cy.get('[data-test="firstName"]').type(firstName)
    if (lastName) cy.get('[data-test="lastName"]').type(lastName)
    if (postalCode) cy.get('[data-test="postalCode"]').type(postalCode)
    return this
  }

  continue(): this {
    cy.get('[data-test="continue"]').click()
    return this
  }

  finish(): this {
    cy.get('[data-test="finish"]').click()
    return this
  }

  assertOrderComplete(): this {
    cy.url().should('include', '/checkout-complete.html')
    cy.get('.complete-header').should('contain.text', 'Thank you for your order!')
    return this
  }

  assertSummaryTotal(expected: string): this {
    cy.get('.summary_subtotal_label').should('contain.text', expected)
    return this
  }
}
