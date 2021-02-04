/// <reference types="cypress" />

describe('Should test at an API level', () => {
  let token

  before(() => {
    cy.getToken('rafael@teste.com', 'teste')
      .then(tkn => {
        token = tkn
      })
  })

  beforeEach(() => {
    cy.resetRest()
  })

  it('Should insert an account', () => {
    cy.request({
      url: '/contas',
      method: 'POST',
      headers: { Authorization: `JWT ${token}` },
      body: {
        nome: 'Conta via rest'
      }
    }).as('response')

    cy.get('@response').then(res => {
      expect(res.status).to.be.equal(201)
      expect(res.body).to.have.property('id')
      expect(res.body).to.have.property('nome', 'Conta via rest')
    })
  })

  it('Should update an account', () => {
    cy.request({
      url: '/contas',
      method: 'GET',
      headers: { Authorization: `JWT ${token}` },
      qs: {
        nome: 'Conta para alterar'
      }
    }).then(res => {
      cy.request({
        url: `/contas/${res.body[0].id}`,
        method: 'PUT',
        headers: { Authorization: `JWT ${token}` },
        body: {
          nome: 'Conta via rest alterada'
        }
      }).as('response')
    })
    cy.get('@response').its('status').should('be.equal', 200)
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