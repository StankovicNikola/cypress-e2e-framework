import { InventoryPage } from '../../pages/InventoryPage'
import { CartPage } from '../../pages/CartPage'

const inventory = new InventoryPage()
const cart = new CartPage()

describe('Inventory', () => {
  beforeEach(() => {
    cy.fixture('users').then(({ standardUser }) => {
      cy.loginBySession(standardUser.username, standardUser.password)
      inventory.goto()
    })
  })

  it('displays 6 products', () => {
    inventory.getItems().should('have.length', 6)
  })

  it('each product has a name, price and add-to-cart button', () => {
    inventory.getItems().each(($item) => {
      inventory.assertItemStructure($item)
    })
  })

  context('Sorting', () => {
    it('sorts by name A→Z (default)', () => {
      cy.fixture('products').then((products) => {
        inventory.getItemNames().first().should('contain.text', products.firstAZ)
      })
    })

    it('sorts by name Z→A', () => {
      cy.fixture('products').then((products) => {
        inventory.sortBy('za')
        inventory.getItemNames().first().should('contain.text', products.firstZA)
      })
    })

    it('sorts by price low→high', () => {
      cy.fixture('products').then((products) => {
        inventory.sortBy('lohi')
        inventory.getItemPrices().first().should('contain.text', products.lowestPrice)
      })
    })

    it('sorts by price high→low', () => {
      cy.fixture('products').then((products) => {
        inventory.sortBy('hilo')
        inventory.getItemPrices().first().should('contain.text', products.highestPrice)
      })
    })
  })

  context('Cart', () => {
    it('adds a product and updates cart badge', () => {
      cy.fixture('products').then((products) => {
        inventory.addToCartByName(products.backpack)
        inventory.getCartBadgeCount().should('have.text', '1')
      })
    })

    it('adds multiple products and reflects correct badge count', () => {
      cy.fixture('products').then((products) => {
        inventory.addToCartByName(products.backpack)
        inventory.addToCartByName(products.bikeLight)
        inventory.getCartBadgeCount().should('have.text', '2')
      })
    })

    it('removes a product from inventory page', () => {
      cy.fixture('products').then((products) => {
        inventory.addToCartByName(products.backpack)
        inventory.removeFromCartByName(products.backpack)
        inventory.assertCartBadgeNotVisible()
      })
    })

    it('navigates to cart page', () => {
      cy.fixture('products').then((products) => {
        inventory.addToCartByName(products.backpack)
        inventory.goToCart()
        cart.assertLoaded()
        cart.assertItemPresent(products.backpack)
      })
    })
  })
})
