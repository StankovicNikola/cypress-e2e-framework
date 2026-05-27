export abstract class BasePage {
  protected readonly baseUrl: string

  constructor(path: string) {
    this.baseUrl = path
  }

  visit(): this {
    cy.visit(this.baseUrl)
    return this
  }

  getByTestId(id: string) {
    return cy.get(`[data-testid="${id}"]`)
  }

  waitForPageLoad(): this {
    cy.document().its('readyState').should('eq', 'complete')
    return this
  }

  assertUrl(pattern: string | RegExp): this {
    cy.url().should('match', typeof pattern === 'string' ? new RegExp(pattern) : pattern)
    return this
  }
}
