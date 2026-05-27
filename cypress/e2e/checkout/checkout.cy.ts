import { InventoryPage } from '../../pages/InventoryPage'
import { CartPage } from '../../pages/CartPage'
import { CheckoutPage } from '../../pages/CheckoutPage'

const inventory = new InventoryPage()
const cart = new CartPage()
const checkout = new CheckoutPage()

describe('Checkout', () => {
  beforeEach(() => {
    cy.loginBySession('standard_user', 'secret_sauce')
    cy.visit('/inventory.html', { failOnStatusCode: false })
    inventory.addToCartByName('Sauce Labs Backpack')
    inventory.addToCartByName('Sauce Labs Bike Light')
    inventory.goToCart()
  })

  it('completes the full checkout flow', () => {
    cart.checkout()
    checkout.fillInfo('Nikola', 'Stankovic', '11000').continue()
    checkout.assertSummaryTotal('$39.98')
    checkout.finish()
    checkout.assertOrderComplete()
  })

  it('shows error when first name is missing', () => {
    cart.checkout()
    checkout.fillInfo('', 'Stankovic', '11000').continue()
    cy.get('[data-test="error"]').should('contain.text', 'First Name is required')
  })

  it('shows error when last name is missing', () => {
    cart.checkout()
    checkout.fillInfo('Nikola', '', '11000').continue()
    cy.get('[data-test="error"]').should('contain.text', 'Last Name is required')
  })

  it('shows error when postal code is missing', () => {
    cart.checkout()
    checkout.fillInfo('Nikola', 'Stankovic', '').continue()
    cy.get('[data-test="error"]').should('contain.text', 'Postal Code is required')
  })

  it('cancel returns to inventory', () => {
    cart.continueShopping()
    inventory.assertLoaded()
  })
})
