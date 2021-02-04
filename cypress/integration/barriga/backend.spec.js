/// <reference types="cypress" />

describe('Should test at a functional level', () => {
  before(() => {
    //cy.login('faelsabc21@gmail.com', 'teste')
  })

  beforeEach(() => {
    //cy.resetApp()
  })

  it('Should insert an account', () => {
    cy.getToken('rafael@teste.com', 'teste')
      .then(token => {
        cy.request({
          url: 'https://barrigarest.wcaquino.me/contas',
          method: 'POST',
          headers: { Authorization: `JWT ${token}` },
          body: {
            nome: 'Conta via rest'
          }
        }).as('response')
      })

    cy.get('@response').then(res => {
      expect(res.status).to.be.equal(201)
      expect(res.body).to.have.property('id')
      expect(res.body).to.have.property('nome', 'Conta via rest')
    })
  })

  it('Should edit an account', () => {

  })

  it('Should not create an account with the same name', () => {

  })

  it('Should create a transaction', () => {

  })

  it('Should get balance', () => {

  })

  it('Should remove a transaction', () => {

  })

})



