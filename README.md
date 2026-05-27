# cypress-e2e-framework

Production-grade Cypress (TypeScript) end-to-end test framework targeting [saucedemo.com](https://www.saucedemo.com), demonstrating Page Object Model, custom commands, session caching, and CI/CD integration via GitHub Actions.

## Stack

| Tool | Purpose |
|------|---------|
| [Cypress](https://www.cypress.io/) | E2E test runner |
| TypeScript | Type-safe test authoring |
| Mochawesome | HTML test reports |
| GitHub Actions | CI — runs on every push/PR |

## Project structure

```
cypress/
├── e2e/
│   ├── auth/           # Login / session tests
│   ├── inventory/      # Product listing, sorting, cart
│   └── checkout/       # End-to-end checkout flow
├── fixtures/
│   └── users.json      # Test user credentials
├── pages/              # Page Object Model classes
│   ├── BasePage.ts
│   ├── LoginPage.ts
│   ├── InventoryPage.ts
│   ├── CartPage.ts
│   └── CheckoutPage.ts
└── support/
    ├── commands.ts     # Custom Cypress commands
    └── e2e.ts          # Global hooks
cypress.config.ts
```

## Getting started

```bash
npm install
```

### Run headlessly (CI mode)

```bash
npm test                  # all specs, Electron
npm run cy:run:chrome     # all specs, Chrome
npm run cy:run:firefox    # all specs, Firefox
```

### Open interactive runner

```bash
npm run cy:open
```

### Run smoke suite only

```bash
npm run cy:smoke
```

## Test suites

### Auth (`cypress/e2e/auth/login.cy.ts`)

| Test | Description |
|------|-------------|
| standard_user logs in | Happy path — lands on `/inventory.html` |
| performance_glitch_user logs in | Verifies slow login still succeeds |
| Wrong password | Asserts error message |
| Locked out user | Asserts lock-out error |
| Missing username | HTML5 validation check |
| Missing password | HTML5 validation check |
| Session persists on reload | Verifies cookies survive a hard refresh |
| Logout | Redirects back to login page |

### Inventory (`cypress/e2e/inventory/inventory.cy.ts`)

| Test | Description |
|------|-------------|
| Displays 6 products | Product count assertion |
| Each product has name, price, button | Per-item assertions |
| Sort A→Z | Default order check |
| Sort Z→A | Name sort descending |
| Sort price low→high | Price `$7.99` first |
| Sort price high→low | Price `$49.99` first |
| Add to cart — badge updates | Cart badge count = 1 |
| Add multiple items | Cart badge count = 2 |
| Remove from inventory page | Badge disappears |
| Navigate to cart | Cart page loads with correct item |

### Checkout (`cypress/e2e/checkout/checkout.cy.ts`)

| Test | Description |
|------|-------------|
| Full checkout flow | Add 2 items → cart → info form → verify `$32.70` total → complete |
| Missing first name | Error: "First Name is required" |
| Missing last name | Error: "Last Name is required" |
| Missing postal code | Error: "Postal Code is required" |
| Cancel returns to inventory | Continue Shopping button |

## Page Object Model

All pages extend `BasePage`, which provides shared utilities (`visit`, `getByTestId`, `waitForPageLoad`, `assertUrl`). Page classes expose fluent, chainable methods:

```ts
login.visit()
     .fillUsername('standard_user')
     .fillPassword('secret_sauce')
     .submit()
```

## Custom commands

| Command | Description |
|---------|-------------|
| `cy.loginBySession(username, password)` | Logs in via UI and caches the session with `cy.session()` — subsequent calls in the same run skip the login page |
| `cy.clearCookiesAndStorage()` | Clears cookies, localStorage, and sessionStorage |

## CI/CD

GitHub Actions runs the full suite on every push to `main`/`develop` and on every pull request targeting `main`, in parallel across Chrome and Firefox:

```
.github/workflows/ci.yml
```

- Screenshots are uploaded as artifacts on failure
- HTML reports are uploaded as artifacts after every run

## Test users

All credentials are from the public saucedemo demo site.

| Username | Password | Notes |
|----------|----------|-------|
| `standard_user` | `secret_sauce` | Default test user |
| `locked_out_user` | `secret_sauce` | Cannot log in |
| `problem_user` | `secret_sauce` | UI bugs present |
| `performance_glitch_user` | `secret_sauce` | Slow login |
