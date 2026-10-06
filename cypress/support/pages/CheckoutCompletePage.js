const { byTestId } = require('./locator');

class CheckoutCompletePage {
  path = '/checkout-complete.html';

  confirmationHeader() {
    return byTestId('complete-header');
  }
}

module.exports = { CheckoutCompletePage };
