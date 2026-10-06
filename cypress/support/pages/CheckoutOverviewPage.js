const { byTestId } = require('./locator');

class CheckoutOverviewPage {
  path = '/checkout-step-two.html';

  finish() {
    this.#finishButton().click();
  }

  #finishButton() {
    return byTestId('finish');
  }
}

module.exports = { CheckoutOverviewPage };
