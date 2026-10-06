const { byTestId } = require('./locator');

class LoginPage {
  visit() {
    cy.visit('/');
  }

  login() {
    cy.env(['uiUsername', 'uiPassword']).then(({ uiUsername, uiPassword }) => {
      this.#username().type(uiUsername);
      this.#password().type(uiPassword, { log: false });
      this.#submit().click();
    });
  }

  #username() {
    return byTestId('username');
  }

  #password() {
    return byTestId('password');
  }

  #submit() {
    return byTestId('login-button');
  }
}

module.exports = { LoginPage };
