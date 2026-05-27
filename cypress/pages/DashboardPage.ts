import { BasePage } from './BasePage'

export class DashboardPage extends BasePage {
  private readonly selectors = {
    welcomeBanner: '[data-testid="welcome-banner"]',
    userMenu: '[data-testid="user-menu"]',
    logoutButton: '[data-testid="logout"]',
    navItems: '[data-testid="nav-item"]',
  }

  constructor() {
    super('/dashboard')
  }

  assertWelcomeVisible(): this {
    cy.get(this.selectors.welcomeBanner).should('be.visible')
    return this
  }

  logout(): this {
    cy.get(this.selectors.userMenu).click()
    cy.get(this.selectors.logoutButton).click()
    return this
  }
}
