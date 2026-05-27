import { InventoryPage } from '../../pages/InventoryPage'
import { CartPage } from '../../pages/CartPage'

const inventory = new InventoryPage()
const cart = new CartPage()

describe('Inventory', () => {
  beforeEach(() => {
    cy.loginBySession('standard_user', 'secret_sauce')
    cy.visit('/inventory.html', { failOnStatusCode: false })
  })

  it('displays 6 products', () => {
    inventory.getItems().should('have.length', 6)
  })

  it('each product has a name, price and add-to-cart button', () => {
    inventory.getItems().each(($item) => {
      cy.wrap($item).find('.inventory_item_name').should('not.be.empty')
      cy.wrap($item).find('.inventory_item_price').should('not.be.empty')
      cy.wrap($item).find('button').should('contain.text', 'Add to cart')
    })
  })

  context('Sorting', () => {
    it('sorts by name A→Z (default)', () => {
      inventory.getItemNames().first().should('contain.text', 'Sauce Labs Backpack')
    })

    it('sorts by name Z→A', () => {
      inventory.sortBy('za')
      inventory.getItemNames().first().should('contain.text', 'Test.allTheThings()')
    })

    it('sorts by price low→high', () => {
      inventory.sortBy('lohi')
      inventory.getItemPrices().first().should('contain.text', '$7.99')
    })

    it('sorts by price high→low', () => {
      inventory.sortBy('hilo')
      inventory.getItemPrices().first().should('contain.text', '$49.99')
    })
  })

  context('Cart', () => {
    it('adds a product and updates cart badge', () => {
      inventory.addToCartByName('Sauce Labs Backpack')
      inventory.getCartBadgeCount().should('have.text', '1')
    })

    it('adds multiple products and reflects correct badge count', () => {
      inventory.addToCartByName('Sauce Labs Backpack')
      inventory.addToCartByName('Sauce Labs Bike Light')
      inventory.getCartBadgeCount().should('have.text', '2')
    })

    it('removes a product from inventory page', () => {
      inventory.addToCartByName('Sauce Labs Backpack')
      inventory.removeFromCartByName('Sauce Labs Backpack')
      cy.get('.shopping_cart_badge').should('not.exist')
    })

    it('navigates to cart page', () => {
      inventory.addToCartByName('Sauce Labs Backpack')
      inventory.goToCart()
      cart.assertLoaded()
      cart.assertItemPresent('Sauce Labs Backpack')
    })
  })
})
