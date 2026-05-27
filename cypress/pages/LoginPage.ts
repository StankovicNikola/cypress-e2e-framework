import { BasePage } from './BasePage'

export class LoginPage extends BasePage {
  private readonly selectors = {
    emailInput: '[data-testid="email-input"]',
    passwordInput: '[data-testid="password-input"]',
    submitButton: '[data-testid="login-submit"]',
    errorMessage: '[data-testid="login-error"]',
    forgotPasswordLink: '[data-testid="forgot-password"]',
  }

  constructor() {
    super('/login')
  }

  fillEmail(email: string): this {
    cy.get(this.selectors.emailInput).clear().type(email)
    return this
  }

  fillPassword(password: string): this {
    cy.get(this.selectors.passwordInput).clear().type(password, { log: false })
    return this
  }

  submit(): this {
    cy.get(this.selectors.submitButton).click()
    return this
  }

  login(email: string, password: string): this {
    return this.fillEmail(email).fillPassword(password).submit()
  }

  assertErrorVisible(message?: string): this {
    cy.get(this.selectors.errorMessage).should('be.visible')
    if (message) cy.get(this.selectors.errorMessage).should('contain.text', message)
    return this
  }
}
