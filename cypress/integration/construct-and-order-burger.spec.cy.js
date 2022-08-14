/* eslint-disable cypress/no-unnecessary-waiting */
/*Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});*/

describe("app handles burger constructing and order placing", () => {
  beforeEach(function () {
    cy.intercept("GET", "api/ingredients", { fixture: "ingredients.json" });
    cy.visit("http://localhost:3000");
    cy.viewport(1300, 800);
  });

  it("should drag bun", function () {
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
      .contains("Ингредиент 7")
      .trigger("dragstart");
    cy.get("[data-cy=constructor]").trigger("drop");
    cy.get("[data-cy=constructor-ingredients]")
      .contains("Ингредиент 7")
      .should("exist");

    cy.get("[data-cy=ingredients]")
      .contains("Ингредиент 4")
      .trigger("dragstart");
    cy.get("[data-cy=constructor]").trigger("drop");
    cy.get("[data-cy=constructor-ingredients]")
      .contains("Ингредиент 4")
      .should("exist");

    cy.get("[data-cy=ingredients]")
      .contains("Ингредиент 8")
      .trigger("dragstart");
    cy.get("[data-cy=constructor]").trigger("drop");
    cy.get("[data-cy=constructor-ingredients]")
      .contains("Ингредиент 8")
      .should("exist");
  });
});
