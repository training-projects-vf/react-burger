/* eslint-disable cypress/no-unnecessary-waiting */
describe('app handles burger constructing and order placing', () => {
  beforeEach(function () {
    cy.visit('http://localhost:3000');
    cy.viewport(1300, 800);
  });

  it('burger create', () => {
    cy.get('#ingredient_div').first().first().as('bunComponent')
    cy.get('@bunComponent').trigger('dragstart');
    cy.get("[data-cy='dropTarget']").trigger('drop');
    //cy.get('@bunComponent').trigger('dragend');
    cy.get("[data-cy='bunInConstructor']").should('exist')

    cy.get("[data-type-cy=sauce]").first().as('sauceComponent')
    cy.get('@sauceComponent').trigger('dragstart');
    cy.get("[data-cy='dropTarget']").trigger('drop');
    //cy.get('@sauceComponent').trigger('dragend');
    cy.get("[data-cy='fillingsInConstructor']").should('exist')

    cy.get("[data-type-cy=main]").first().as('mainComponent');
    cy.get('@mainComponent').trigger('dragstart');
    cy.get("[data-cy='dropTarget']").trigger('drop');
    //cy.get('@mainComponent').trigger('dragend');
    cy.get("[data-cy='fillingInConstructor']").should('have.length', 2)
  })
})
