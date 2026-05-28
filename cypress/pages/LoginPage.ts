import { BasePage } from './BasePage'

export class LoginPage extends BasePage {
  private readonly selectors = {
    username: '[data-test="username"]',
    password: '[data-test="password"]',
    loginButton: '[data-test="login-button"]',
    error: '[data-test="error"]',
  }

  constructor() {
    super('/')
  }

  fillUsername(username: string): this {
    cy.get(this.selectors.username).clear().type(username)
    return this
  }

  fillPassword(password: string): this {
    cy.get(this.selectors.password).clear().type(password, { log: false })
    return this
  }

  submit(): this {
    cy.get(this.selectors.loginButton).click()
    return this
  }

  login(username: string, password: string): this {
    return this.fillUsername(username).fillPassword(password).submit()
  }

  assertErrorVisible(message?: string): this {
    cy.get(this.selectors.error).should('be.visible')
    if (message) cy.get(this.selectors.error).should('contain.text', message)
    return this
  }

  assertLoginButtonVisible(): this {
    cy.get(this.selectors.loginButton).should('be.visible')
    return this
  }
}
