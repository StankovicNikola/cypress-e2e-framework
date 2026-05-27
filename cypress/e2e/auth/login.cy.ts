import { LoginPage } from '../../pages/LoginPage'
import { DashboardPage } from '../../pages/DashboardPage'

const login = new LoginPage()
const dashboard = new DashboardPage()

describe('Authentication', () => {
  beforeEach(() => {
    login.visit()
  })

  context('Valid credentials', () => {
    it('logs in and redirects to dashboard', () => {
      cy.fixture('users').then(({ validUser }) => {
        login.login(validUser.email, validUser.password)
        dashboard.assertWelcomeVisible()
        login.assertUrl('/dashboard')
      })
    })

    it('persists session across page reload', () => {
      cy.fixture('users').then(({ validUser }) => {
        cy.loginByApi(validUser.email, validUser.password)
        cy.visit('/dashboard')
        dashboard.assertWelcomeVisible()
      })
    })
  })

  context('Invalid credentials', () => {
    it('shows an error for wrong password', () => {
      cy.fixture('users').then(({ validUser }) => {
        login.login(validUser.email, 'wrongpassword')
        login.assertErrorVisible('Invalid email or password')
      })
    })

    it('shows an error for unregistered email', () => {
      login.login('notregistered@example.com', 'Test@1234')
      login.assertErrorVisible('Invalid email or password')
    })

    it('shows an error for a locked account', () => {
      cy.fixture('users').then(({ lockedUser }) => {
        login.login(lockedUser.email, lockedUser.password)
        login.assertErrorVisible('account has been locked')
      })
    })
  })

  context('Validation', () => {
    it('requires email', () => {
      login.fillPassword('Test@1234').submit()
      login.getByTestId('email-input').then(($el) => {
        expect(($el[0] as HTMLInputElement).validity.valueMissing).to.be.true
      })
    })

    it('rejects malformed email', () => {
      login.fillEmail('notanemail').fillPassword('Test@1234').submit()
      login.getByTestId('email-input').then(($el) => {
        expect(($el[0] as HTMLInputElement).validity.typeMismatch).to.be.true
      })
    })
  })
})
