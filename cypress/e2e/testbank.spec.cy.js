import { login } from "../support/login"

describe('Test Suite', () => {
  beforeEach(() => {
    cy.visit('http://zero.webappsecurity.com')
  })

  it('Validate Homepage', () => {
    cy.get('#homeMenu').contains('Home').should('be.visible')
    cy.get('.active > img').should('be.visible')
  })

  it('Validate Login-logout', () => {
    login()
    cy.get('#account_summary_tab > a').should('be.visible')
    cy.verifySubtitle(0, "Cash Accounts")
    cy.verifySubtitle(1, "Investment Accounts")
    cy.verifySubtitle(2, "Credit Accounts")
    cy.verifySubtitle(3, "Loan Accounts")
    cy.get('.icon-user').click()
    cy.get('#logout_link').click()
    cy.get('#signin_button').should('be.visible')
  })

  it('Validate tranference', () => {
    login()
    cy.get('#transfer_funds_tab > a').click()
    cy.get('.board-header').should('have.text', 'Transfer Money & Make Payments')
    cy.get('#tf_fromAccountId').select('1')
    cy.get('#tf_toAccountId').select('5')
    cy.get('#tf_amount').type('500000')
    cy.get('#tf_description').type("Test description")
    cy.get('#btn_submit').click()
    cy.get('#btn_submit').click()
    cy.get('.alert')
        .contains('You successfully submitted your transaction')
        .should('have.class', 'alert-success')
  })

  it('Validate Payment', () => {   
    login() 
    cy.get('#pay_bills_tab > a').click()
    cy.get('.board-header').should('have.text', 'Make payments to your saved payees')
    cy.get('#sp_payee').select('bofa')
    cy.get('#sp_account').select('1')
    cy.get('#sp_amount').type('100')
    cy.get('#sp_date').type("2022-08-20")
    cy.get('.ui-datepicker-current-day > .ui-state-default').click()
    cy.get('#sp_description').type("Test description")
    cy.get('#pay_saved_payees').click()
    cy.get('.alert')
      .contains('The payment was successfully submitted.')
      .should('be.visible')
  })
})