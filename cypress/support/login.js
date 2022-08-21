export function login() {
    cy.get('#signin_button').click()
    cy.get('#user_login').type('username')
    cy.get('#user_password').type('password')
    cy.get('.btn').click()
}