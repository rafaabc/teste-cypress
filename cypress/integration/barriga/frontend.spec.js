/// <reference types="cypress" />

import loc from '../../support/locators'
import '../../support/commandsContas'

describe('Should test at a frontend level', () => {
  before(() => {
    cy.intercept('POST', '/signin', {
      id: '13283',
      nome: 'usuario falso',
      token: 'Uma string muito grande que nao deveria ser aceito mas na verdade, vai'
    }).as('signin')

    cy.intercept('GET', '/saldo', [{
      conta_id: '999',
      conta: 'Carteira',
      saldo: '100,00'
    },
    {
      conta_id: '9909',
      conta: 'Banco',
      saldo: '1000000,00'
    }
    ]).as('saldo')
    cy.login('rafael@teste.com', 'senha errada')
  })

  after(() => {
    cy.clearLocalStorage()
  })

  beforeEach(() => {
    cy.get(loc.MENU.HOME).click()
  })

  it('Should create an account', () => {
    //https://github.com/cypress-io/cypress/issues/9302 so this will be commented 
    /*cy.intercept('GET', '/contas', [
      { id: 1, nome: 'Carteira', visivel: true, usuario_id: 1 },
      { id: 2, nome: 'Banco', visivel: true, usuario_id: 1 }
    ]).as('contas')*/

    cy.intercept('POST', '/contas', {
      id: 3,
      nome: 'Conta de teste',
      visivel: true,
      usuario_id: 1
    }).as('saveContas')

    cy.acessarMenuConta()

    cy.intercept('GET', '/contas', [
      { id: 1, nome: 'Carteira', visivel: true, usuario_id: 1 },
      { id: 2, nome: 'Banco', visivel: true, usuario_id: 1 },
      { id: 3, nome: 'Conta de teste', visivel: true, usuario_id: 1 }
    ]).as('contasSave')

    cy.inserirConta('Conta de teste')
    cy.get(loc.MESSAGE).should('contain', 'Conta inserida com sucesso')
  })

  it('Should update an account', () => {
    cy.intercept('GET', '/contas', [
      { id: 1, nome: 'Carteira', visivel: true, usuario_id: 1 },
      { id: 2, nome: 'Banco', visivel: true, usuario_id: 1 }
    ]).as('contas')

    cy.intercept('PUT', '/contas/1', [
      { id: 1, nome: 'Conta alterada', visivel: true, usuario_id: 1 }
    ]).as('contasUpdate')

    cy.acessarMenuConta()
    cy.xpath(loc.CONTAS.FN_XP_BTN_ALTERAR('Carteira')).click()
    cy.get(loc.CONTAS.NOME).clear().type('Conta alterada')
    cy.get(loc.CONTAS.BTN_SALVAR).click({ force: true })
    cy.get(loc.MESSAGE).should('contain', 'atualizada com sucesso')
  })

  it('Should not create an account with the same name', () => {
    cy.intercept('GET', '/contas', [
      { id: 1, nome: 'Carteira', visivel: true, usuario_id: 1 },
      { id: 2, nome: 'Banco', visivel: true, usuario_id: 1 }
    ]).as('contas')

    cy.intercept('POST', '/contas', {
      "error": "Já existe uma conta com esse nome!", statusCode: 400
    }).as('saveContaMesmoNome')

    cy.acessarMenuConta()
    cy.get(loc.CONTAS.NOME).type('Conta mesmo nome')
    cy.get(loc.CONTAS.BTN_SALVAR).click({ force: true })
    cy.get(loc.MESSAGE).should('contain', 'code 400')
  })

  /*
  it('Should create a transaction', () => {
    cy.get(loc.MENU.MOVIMENTACAO).click()
    cy.get(loc.MOVIMENTACAO.DESCRICAO).type('Desc')
    cy.get(loc.MOVIMENTACAO.VALOR).type('100', { force: true })
    cy.get(loc.MOVIMENTACAO.INTERESSADO).type('Inter')
    cy.get(loc.MOVIMENTACAO.CONTA).select('Conta para movimentacoes')
    cy.get(loc.MOVIMENTACAO.STATUS).click()
    cy.get(loc.MOVIMENTACAO.BTN_SALVAR).click()
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
    cy.get(loc.MENU.EXTRATO).click()
    cy.xpath(loc.EXTRATO.FN_XP_REMOVER_ELEMENTO('Movimentacao para exclusao')).click()
    cy.get(loc.MESSAGE).should('contain', 'removida com sucesso')
  })*/
})



