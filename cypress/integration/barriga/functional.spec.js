/// <reference types="cypress" />

import loc from '../../support/locators'

describe('Should test at a functional level', () => {
  before(() => {
    cy.login('faelsabc21@gmail.com', 'teste')
    cy.resetApp()
  })

  it('Should insert an account', () => {
    cy.get(loc.MENU.SETTINGS).click()
    cy.get(loc.MENU.CONTAS).click()
    cy.get(loc.CONTAS.NOME).click().type('Conta de teste')
    cy.get(loc.CONTAS.BTN_SALVAR).click()
    cy.get(loc.MESSAGE).should('contain', 'inserida com sucesso')
  })

  it('Should edit an account', () => {
    cy.get(loc.MENU.SETTINGS).click()
    cy.get(loc.MENU.CONTAS).click()
    cy.xpath(loc.CONTAS.XP_BTN_ALTERAR).click()
    cy.get(loc.CONTAS.NOME).clear().type('Conta editada')
    cy.get(loc.CONTAS.BTN_SALVAR).click()
    cy.get(loc.MESSAGE).should('contain', 'atualizada com sucesso')
  })
})



