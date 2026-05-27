import { InventoryPage } from '../../pages/InventoryPage'
import { CartPage } from '../../pages/CartPage'
import { CheckoutPage } from '../../pages/CheckoutPage'

const inventory = new InventoryPage()
const cart = new CartPage()
const checkout = new CheckoutPage()

describe('Checkout', () => {
  beforeEach(() => {
    cy.fixture('users').then(({ standardUser }) => {
      cy.loginBySession(standardUser.username, standardUser.password)
      inventory.goto()
    })
    cy.fixture('products').then((products) => {
      inventory.addToCartByName(products.backpack)
      inventory.addToCartByName(products.bikeLight)
      inventory.goToCart()
    })
  })

  it('completes the full checkout flow', () => {
    cy.fixture('checkout').then(({ validInfo }) => {
      cart.checkout()
      checkout.fillInfo(validInfo.firstName, validInfo.lastName, validInfo.postalCode).continue()
      checkout.assertSummaryTotal(validInfo.expectedTotal)
      checkout.finish()
      checkout.assertOrderComplete()
    })
  })

  it('shows error when first name is missing', () => {
    cy.fixture('checkout').then(({ validInfo }) => {
      cart.checkout()
      checkout.fillInfo('', validInfo.lastName, validInfo.postalCode).continue()
      checkout.assertErrorVisible('First Name is required')
    })
  })

  it('shows error when last name is missing', () => {
    cy.fixture('checkout').then(({ validInfo }) => {
      cart.checkout()
      checkout.fillInfo(validInfo.firstName, '', validInfo.postalCode).continue()
      checkout.assertErrorVisible('Last Name is required')
    })
  })

  it('shows error when postal code is missing', () => {
    cy.fixture('checkout').then(({ validInfo }) => {
      cart.checkout()
      checkout.fillInfo(validInfo.firstName, validInfo.lastName, '').continue()
      checkout.assertErrorVisible('Postal Code is required')
    })
  })

  it('cancel returns to inventory', () => {
    cart.continueShopping()
    inventory.assertLoaded()
  })
})
