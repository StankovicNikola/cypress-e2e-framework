import { BasePage } from './BasePage'

export class CheckoutPage extends BasePage {
  private readonly selectors = {
    firstName: '[data-test="firstName"]',
    lastName: '[data-test="lastName"]',
    postalCode: '[data-test="postalCode"]',
    continue: '[data-test="continue"]',
    finish: '[data-test="finish"]',
    error: '[data-test="error"]',
    completeHeader: '.complete-header',
    summarySubtotalLabel: '.summary_subtotal_label',
  }

  constructor() {
    super('/checkout-step-one.html')
  }

  fillInfo(firstName: string, lastName: string, postalCode: string): this {
    if (firstName) cy.get(this.selectors.firstName).type(firstName)
    if (lastName) cy.get(this.selectors.lastName).type(lastName)
    if (postalCode) cy.get(this.selectors.postalCode).type(postalCode)
    return this
  }

  continue(): this {
    cy.get(this.selectors.continue).click()
    return this
  }

  finish(): this {
    cy.get(this.selectors.finish).click()
    return this
  }

  assertOrderComplete(): this {
    cy.url().should('include', '/checkout-complete.html')
    cy.get(this.selectors.completeHeader).should('contain.text', 'Thank you for your order!')
    return this
  }

  assertSummaryTotal(expected: string): this {
    cy.get(this.selectors.summarySubtotalLabel).should('contain.text', expected)
    return this
  }

  assertErrorVisible(message: string): this {
    cy.get(this.selectors.error).should('contain.text', message)
    return this
  }
}
