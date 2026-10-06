const { LoginPage } = require('../../support/pages/LoginPage');
const { InventoryPage } = require('../../support/pages/InventoryPage');
const { CartPage } = require('../../support/pages/CartPage');
const { CheckoutInformationPage } = require('../../support/pages/CheckoutInformationPage');
const { CheckoutOverviewPage } = require('../../support/pages/CheckoutOverviewPage');
const { CheckoutCompletePage } = require('../../support/pages/CheckoutCompletePage');

describe('SauceDemo checkout', () => {
  const loginPage = new LoginPage();
  const inventoryPage = new InventoryPage();
  const cartPage = new CartPage();
  const checkoutInformationPage = new CheckoutInformationPage();
  const checkoutOverviewPage = new CheckoutOverviewPage();
  const checkoutCompletePage = new CheckoutCompletePage();

  let checkout;

  before(() => {
    cy.fixture('ui/fixtures/checkout.json').then((fixture) => {
      checkout = fixture;
    });
  });

  it('buys the first two inventory items', () => {
    loginPage.visit();
    loginPage.login();
    cy.url().should('include', inventoryPage.path);

    inventoryPage.addFirstItems(checkout.itemsToBuy);
    inventoryPage.cartBadge().should('have.text', String(checkout.itemsToBuy));

    inventoryPage.openCart();
    cy.url().should('include', cartPage.path);
    cartPage.items().should('have.length', checkout.itemsToBuy);

    cartPage.proceedToCheckout();
    checkoutInformationPage.fillInformation(checkout.customer);
    checkoutInformationPage.continue();
    cy.url().should('include', checkoutOverviewPage.path);

    checkoutOverviewPage.finish();
    cy.url().should('include', checkoutCompletePage.path);
    checkoutCompletePage.confirmationHeader().should('contain', checkout.orderConfirmation);
  });
});
