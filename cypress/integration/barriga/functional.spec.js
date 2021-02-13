/// <reference types="cypress" />

import loc from '../../support/locators'
import '../../support/commandsContas'

describe('Should test at a functional level', () => {
  before(() => {
    cy.login('rafael@teste.com', 'teste')
    cy.resetApp()
  })

  beforeEach(() => {
    cy.get(loc.MENU.HOME).click()
    cy.resetApp()
  })

  it('Should insert an account', () => {
    cy.acessarMenuConta()
    cy.inserirConta('Conta de teste')
    cy.get(loc.MESSAGE).should('contain', 'inserida com sucesso')
  })

  it('Should update an account', () => {
    cy.acessarMenuConta()
    cy.alterarConta('Conta para alterar', 'Conta alterada')
    cy.get(loc.MESSAGE).should('contain', 'atualizada com sucesso')
  })

  it('Should not create an account with the same name', () => {
    cy.acessarMenuConta()
    cy.inserirConta('Conta mesmo nome')
    cy.get(loc.MESSAGE).should('contain', 'code 400')
  })

  it('Should create a transaction', () => {
    cy.criarMovimentacao('Desc', '100', 'Inter', 'Conta para movimentacoes')
    cy.get(loc.MESSAGE).should('contain', 'sucesso')
    cy.get(loc.EXTRATO.LINHAS).should('have.length', 7)
    cy.xpath(loc.EXTRATO.FN_XP_BUSCA_ELEMENTO('Desc', '100,00')).should('exist')

  })

  it('Should get balance', () => {
    cy.get(loc.MENU.HOME).click()
    cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA('Conta para saldo')).should('contain', '534,00')
    cy.get(loc.MENU.EXTRATO).click()
    cy.xpath(loc.EXTRATO.FN_XP_ALTERAR_ELEMENTO('Movimentacao 1, calculo saldo')).click()
    cy.get(loc.MOVIMENTACAO.DESCRICAO).should('have.value', 'Movimentacao 1, calculo saldo')
    cy.get(loc.MOVIMENTACAO.STATUS).click()
    cy.get(loc.MOVIMENTACAO.BTN_SALVAR).click()
    cy.get(loc.MESSAGE).should('contain', 'Movimentação alterada com sucesso')
    cy.get(loc.MENU.HOME).click()
    cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA('Conta para saldo')).should('contain', '4.034,00')
  })

  it('Should remove a transaction', () => {
    cy.removerTransacao('Movimentacao para exclusao')
    cy.get(loc.MESSAGE).should('contain', 'removida com sucesso')
  })
})



