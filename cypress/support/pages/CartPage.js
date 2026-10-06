const { byTestId } = require('./locator');

class CartPage {
  path = '/cart.html';

  items() {
    return cy.get('.cart_item');
  }

  proceedToCheckout() {
    this.#checkoutButton().click();
  }

  #checkoutButton() {
    return byTestId('checkout');
  }
}

module.exports = { CartPage };
