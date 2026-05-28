import { BasePage } from './BasePage'

export class InventoryPage extends BasePage {
  private readonly selectors = {
    inventoryList: '.inventory_list',
    inventoryItem: '.inventory_item',
    inventoryItemName: '.inventory_item_name',
    inventoryItemPrice: '.inventory_item_price',
    inventoryItemButton: 'button',
    sortContainer: '[data-test="product-sort-container"]',
    cartBadge: '.shopping_cart_badge',
    cartLink: '.shopping_cart_link',
    burgerMenuBtn: '#react-burger-menu-btn',
    logoutSidebarLink: '#logout_sidebar_link',
  }

  constructor() {
    super('/inventory.html')
  }

  goto(): this {
    cy.visit(this.baseUrl, { failOnStatusCode: false })
    return this
  }

  assertLoaded(): this {
    cy.url().should('include', '/inventory.html')
    cy.get(this.selectors.inventoryList).should('be.visible')
    return this
  }

  getItems() {
    return cy.get(this.selectors.inventoryItem)
  }

  getItemNames() {
    return cy.get(this.selectors.inventoryItemName)
  }

  getItemPrices() {
    return cy.get(this.selectors.inventoryItemPrice)
  }

  assertItemStructure($item: JQuery<HTMLElement>): void {
    cy.wrap($item).find(this.selectors.inventoryItemName).should('not.be.empty')
    cy.wrap($item).find(this.selectors.inventoryItemPrice).should('not.be.empty')
    cy.wrap($item).find(this.selectors.inventoryItemButton).should('contain.text', 'Add to cart')
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
    cy.get(this.selectors.sortContainer).select(option)
    return this
  }

  getCartBadgeCount() {
    return cy.get(this.selectors.cartBadge)
  }

  assertCartBadgeNotVisible(): this {
    cy.get(this.selectors.cartBadge).should('not.exist')
    return this
  }

  goToCart(): this {
    cy.get(this.selectors.cartLink).click()
    return this
  }

  openBurgerMenu(): this {
    cy.get(this.selectors.burgerMenuBtn).click()
    return this
  }

  logout(): this {
    this.openBurgerMenu()
    cy.get(this.selectors.logoutSidebarLink).click()
    return this
  }
}
