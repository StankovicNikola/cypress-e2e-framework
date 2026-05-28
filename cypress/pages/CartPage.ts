import { BasePage } from './BasePage'

export class CartPage extends BasePage {
  private readonly selectors = {
    cartItem: '.cart_item',
    inventoryItemName: '.inventory_item_name',
    continueShopping: '[data-test="continue-shopping"]',
    checkout: '[data-test="checkout"]',
  }

  constructor() {
    super('/cart.html')
  }

  assertLoaded(): this {
    cy.url().should('include', '/cart.html')
    return this
  }

  getCartItems() {
    return cy.get(this.selectors.cartItem)
  }

  assertItemPresent(name: string): this {
    cy.get(this.selectors.inventoryItemName).should('contain.text', name)
    return this
  }

  assertEmpty(): this {
    cy.get(this.selectors.cartItem).should('not.exist')
    return this
  }

  continueShopping(): this {
    cy.get(this.selectors.continueShopping).click()
    return this
  }

  checkout(): this {
    cy.get(this.selectors.checkout).click()
    return this
  }
}
