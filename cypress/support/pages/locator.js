function byTestId(name) {
  return cy.get(`[data-test="${name}"]`);
}

module.exports = { byTestId };
