/* eslint-disable cypress/no-unnecessary-waiting */
/*Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});*/

describe("app handles burger constructing and order placing", () => {
  beforeEach(function () {
    window.localStorage.setItem(
      'refreshToken',
      JSON.stringify('test-refreshToken')
    );
    cy.setCookie('accessToken', 'test-accessToken');

    cy.intercept("GET", "api/ingredients", { fixture: "ingredients.json" });
    cy.intercept('POST', '/api/auth/token', { fixture: 'tokens.json' });
    cy.intercept('GET', '/api/auth/user', { fixture: 'user.json' });
    cy.intercept('POST', '/api/orders', { fixture: 'post_order.json' })
    cy.intercept('POST',)
    cy.visit("http://localhost:3000");
    cy.viewport(1300, 800);
  });

  afterEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
  })

  it("drag, reorder, remove ingredients, place order test", function () {
    cy.get("[data-cy=ingredients]")
      .contains("Ингредиент 1")
      .trigger("dragstart");
    cy.get("[data-cy=constructor]").trigger("drop");
    cy.get("[data-cy=constructor-bun-1]")
      .contains("Ингредиент 1")
      .should("exist");
    cy.get("[data-cy=constructor-bun-2]")
      .contains("Ингредиент 1")
      .should("exist");

    cy.get("[data-cy=ingredients]")
      .contains("Ингредиент 3")
      .trigger("dragstart");
    cy.get("[data-cy=constructor]").trigger("drop");
    cy.get("[data-cy=constructor-ingredients]")
      .contains("Ингредиент 3")
      .should("exist");

    cy.get("[data-cy=ingredients]")
      .contains("Ингредиент 4")
      .trigger("dragstart");
    cy.get("[data-cy=constructor]").trigger("drop");
    cy.get("[data-cy=constructor-ingredients]")
      .contains("Ингредиент 4")
      .should("exist");

    cy.get('[data-cy="constructor-ingredients"] > :nth-child(1) > .constructor-element > .constructor-element__row > .constructor-element__action > svg')
      .trigger("click");
    cy.get('[data-cy="constructor-ingredients"]')
      .should('not.contain', 'Ингредиент 4')

    cy.get("[data-cy=ingredients]")
      .contains("Ингредиент 8")
      .trigger("dragstart");
    cy.get("[data-cy=constructor]").trigger("drop");
    cy.get("[data-cy=constructor-ingredients]")
      .contains("Ингредиент 8")
      .should("exist");

    // cy.get("[data-cy='dragIcon']").first().as('dragIcon')
    // cy.get('@dragIcon')
    //   .trigger('dragstart')
    // cy.get("[data-cy='orderButton']").as('orderButton')
    // cy.get('@orderButton')
    //   .trigger('drop')
    // cy.get("[data-cy=fillingInConstructor]")
    //   .last()
    //   .should('contain', 'Ингредиент 8')

    cy.get('[data-cy="orderButton"]')
      .click()
    cy.get('[data-cy="orderDetails"]')
      .should('exist')

    cy.get('#closeIcon').click()
    cy.get('[data-cy="orderDetails"]')
      .should('not.exist')

  });
});
