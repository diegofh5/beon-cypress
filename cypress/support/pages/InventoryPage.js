class InventoryPage {
  path = '/inventory.html';

  cartBadge() {
    return cy.get('.shopping_cart_badge');
  }

  addFirstItems(count) {
    for (let index = 0; index < count; index += 1) {
      this.#addToCartButton(index).click();
    }
  }

  openCart() {
    this.#cartLink().click();
  }

  #items() {
    return cy.get('.inventory_item');
  }

  #addToCartButton(index) {
    return this.#items().eq(index).find('button');
  }

  #cartLink() {
    return cy.get('.shopping_cart_link');
  }
}

module.exports = { InventoryPage };
