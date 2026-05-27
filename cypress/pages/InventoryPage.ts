import { BasePage } from './BasePage'

export class InventoryPage extends BasePage {
  constructor() {
    super('/inventory.html')
  }

  assertLoaded(): this {
    cy.url().should('include', '/inventory.html')
    cy.get('.inventory_list').should('be.visible')
    return this
  }

  getItems() {
    return cy.get('.inventory_item')
  }

  getItemNames() {
    return cy.get('.inventory_item_name')
  }

  getItemPrices() {
    return cy.get('.inventory_item_price')
  }

  addToCartByName(name: string): this {
    const slug = name.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, '')
    cy.get(`[data-test="add-to-cart-${slug}"]`).click()
    return this
  }

  removeFromCartByName(name: string): this {
    const slug = name.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, '')
    cy.get(`[data-test="remove-${slug}"]`).click()
    return this
  }

  sortBy(option: 'az' | 'za' | 'lohi' | 'hilo'): this {
    cy.get('[data-test="product-sort-container"]').select(option)
    return this
  }

  getCartBadgeCount() {
    return cy.get('.shopping_cart_badge')
  }

  goToCart(): this {
    cy.get('.shopping_cart_link').click()
    return this
  }

  openBurgerMenu(): this {
    cy.get('#react-burger-menu-btn').click()
    return this
  }

  logout(): this {
    this.openBurgerMenu()
    cy.get('#logout_sidebar_link').click()
    return this
  }
}
