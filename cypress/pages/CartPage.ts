import { BasePage } from './BasePage'

export class CartPage extends BasePage {
  constructor() {
    super('/cart.html')
  }

  assertLoaded(): this {
    cy.url().should('include', '/cart.html')
    return this
  }

  getCartItems() {
    return cy.get('.cart_item')
  }

  assertItemPresent(name: string): this {
    cy.get('.inventory_item_name').should('contain.text', name)
    return this
  }

  assertEmpty(): this {
    cy.get('.cart_item').should('not.exist')
    return this
  }

  continueShopping(): this {
    cy.get('[data-test="continue-shopping"]').click()
    return this
  }

  checkout(): this {
    cy.get('[data-test="checkout"]').click()
    return this
  }
}
