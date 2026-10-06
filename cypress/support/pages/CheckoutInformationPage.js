const { byTestId } = require('./locator');

class CheckoutInformationPage {
  fillInformation({ firstName, lastName, postalCode }) {
    this.#firstName().type(firstName);
    this.#lastName().type(lastName);
    this.#postalCode().type(postalCode);
  }

  continue() {
    this.#continueButton().click();
  }

  #firstName() {
    return byTestId('firstName');
  }

  #lastName() {
    return byTestId('lastName');
  }

  #postalCode() {
    return byTestId('postalCode');
  }

  #continueButton() {
    return byTestId('continue');
  }
}

module.exports = { CheckoutInformationPage };
