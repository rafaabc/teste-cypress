/// <reference types="cypress" />

import loc from '../../support/locators'
import '../../support/commandsContas'

describe('Should test at a functional level', () => {
  before(() => {
    cy.login('faelsabc21@gmail.com', 'teste')
    cy.resetApp()
  })

  it('Should insert an account', () => {
    cy.acessarMenuConta()
    cy.inserirConta('Conta de teste')
    cy.get(loc.MESSAGE).should('contain', 'inserida com sucesso')
  })

  it('Should edit an account', () => {
    cy.acessarMenuConta()
    cy.xpath(loc.CONTAS.XP_BTN_ALTERAR).click()
    cy.get(loc.CONTAS.NOME).clear().type('Conta editada')
    cy.get(loc.CONTAS.BTN_SALVAR).click()
    cy.get(loc.MESSAGE).should('contain', 'atualizada com sucesso')
  })

  it('Should not create an account with the same name', () => {
    cy.acessarMenuConta()
    cy.inserirConta('Conta editada')
    cy.get(loc.MESSAGE).should('contain', 'code 400')
  })
})



