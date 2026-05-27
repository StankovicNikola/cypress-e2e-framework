import { BasePage } from './BasePage'

export class LoginPage extends BasePage {
  constructor() {
    super('/')
  }

  fillUsername(username: string): this {
    cy.get('[data-test="username"]').clear().type(username)
    return this
  }

  fillPassword(password: string): this {
    cy.get('[data-test="password"]').clear().type(password, { log: false })
    return this
  }

  submit(): this {
    cy.get('[data-test="login-button"]').click()
    return this
  }

  login(username: string, password: string): this {
    return this.fillUsername(username).fillPassword(password).submit()
  }

  assertErrorVisible(message?: string): this {
    cy.get('[data-test="error"]').should('be.visible')
    if (message) cy.get('[data-test="error"]').should('contain.text', message)
    return this
  }
}
