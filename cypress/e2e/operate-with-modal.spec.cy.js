describe('aps correctly handling click on an ingredient', () => {
  before(function () {
    cy.visit('http://localhost:3000');
  });

  it('opens ingredient modal after click on an ingredient image and close on click on an overlay', () => {
    cy.get('#ingredient_div').first().click()
    cy.get('#container').should('exist')
    cy.get('#container').click(1, 1).should('not.exist')
  })

  it('opens modal on click and close on ESC', () => {
    cy.get('#ingredient_div').first().click()
    cy.get('#container').should('exist')
    cy.get('body').type('{ESC}')
    cy.get('#container').should('not.exist')
  })

  it('opens modal on click and close on click on the closeIcon', () => {
    cy.get('#ingredient_div').first().click()
    cy.get('#container').should('exist')
    cy.get('#closeIcon').click()
    cy.get('#container').should('not.exist')
  })
})
