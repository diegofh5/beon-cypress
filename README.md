# Cypress framework

API and UI tests share one config. Hosts and logins are in `cypress.env.json`. Static JSON lives next to the specs that use it.

## Setup

Node.js 22 or newer, plus Google Chrome if you open the interactive runner.

```bash
cd cypress-framework
npm install
npx cypress install
npx cypress verify
```

| Key | Used by |
| --- | --- |
| `baseUrl` | UI. `cy.visit('/')` opens this site. |
| `uiUsername`, `uiPassword` | SauceDemo login |
| `apiUrl` | Restful-Booker requests |
| `apiUsername`, `apiPassword` | `POST /auth` |

## Run both tests

From `cypress-framework`, after the setup above:

```bash
npm test
npm run test:report
```

`npm test` runs both specs and writes an HTML report to `cypress/reports/html/index.html`. `npm run test:report` opens that file.

That runs both specs, one after the other:

| Spec | What it checks |
| --- | --- |
| `cypress/e2e/api/booking_lifecycle.cy.js` | Restful-Booker create, read, update, and delete |
| `cypress/e2e/ui/ecommerce_checkout.cy.js` | SauceDemo login and checkout of the first two items |

Run only one suite:

```bash
npm run test:api
npm run test:ui
```

Open Cypress and pick a spec:

```bash
npm run cy:open
```

## Layout

| Path | Role |
| --- | --- |
| `cypress/e2e/api` | HTTP specs, service helpers, and `fixtures/booking.json`. |
| `cypress/e2e/ui` | Browser specs and `fixtures/checkout.json`. |
| `cypress/support/pages` | Page objects: locators and actions for one screen. |


## Manual QA bug report

**Title:** Unable to add specific products to the cart when logged in as `problem_user`

### Description

When authenticated as `problem_user`, clicking the "Add to cart" button for certain products on the Inventory page fails to add the item to the shopping cart. The UI button state does not toggle to "Remove", and the shopping cart badge fails to increment. This blocks the e-commerce purchasing flow for affected catalog items.

### Steps to reproduce

1. Navigate to [https://www.saucedemo.com/](https://www.saucedemo.com/).
2. Log in using credentials:
   - Username: `problem_user`
   - Password: `secret_sauce`
3. Land on the Inventory page.
4. Attempt to click the Add to cart button for each product listed on the page.
5. Observe the button state and the top-right shopping cart badge count after each click.

### Expected result

Clicking "Add to cart" on any item successfully adds the product to the cart, updates the button label to "Remove", and increments the shopping cart badge count by 1 for each added item.

### Actual result

Some products do not respond when "Add to cart" is clicked. The button remains unchanged, and the item is not added to the cart count.

### Severity

High

<img width="1705" height="1080" alt="Screenshot 2026-10-05 at 8 43 05 PM" src="https://github.com/user-attachments/assets/181cac29-38ef-47f4-be3d-d09b1b53e879" />
<img width="1687" height="1066" alt="Screenshot 2026-10-05 at 8 43 36 PM" src="https://github.com/user-attachments/assets/9c5171fb-1765-4a46-96a1-eaa10928c117" />
<img width="1682" height="646" alt="Screenshot 2026-10-05 at 9 05 44 PM" src="https://github.com/user-attachments/assets/75ca5f04-021e-410c-9436-a5a6bbea9c26" />
