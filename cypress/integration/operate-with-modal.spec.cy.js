describe('aps correctly handling click on an ingredient and close the modal', () => {
  before(function () {
    cy.intercept("GET", "api/ingredients", { fixture: "ingredients.json" });
    cy.visit('http://localhost:3000');
  });

  it('open and close modal on click and on Esc', () => {
    cy.get('[data-type-cy="bun"]').eq(1).click()
    cy.get('#container').should('exist')
    cy.get('#container').click(1, 1).should('not.exist')

    cy.get('[data-type-cy="sauce"]').eq(1).click()
    cy.get('#container').should('exist')
    cy.get('body').type('{ESC}')
    cy.get('#container').should('not.exist')

    cy.get('[data-type-cy="main"]').eq(1).click()
    cy.get('#container').should('exist')
    cy.get('#closeIcon').click()
    cy.get('#container').should('not.exist')

  })

})
