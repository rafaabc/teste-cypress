import loc from './locators'

Cypress.Commands.add('acessarMenuConta', () => {
  cy.get(loc.MENU.SETTINGS).click()
  cy.get(loc.MENU.CONTAS).click()
})

Cypress.Commands.add('inserirConta', conta => {
  cy.get(loc.CONTAS.NOME).click().type(conta)
  cy.get(loc.CONTAS.BTN_SALVAR).click({ force: true })
})

Cypress.Commands.add('alterarConta', (contaAtual, novaConta) => {
  cy.xpath(loc.CONTAS.FN_XP_BTN_ALTERAR(contaAtual)).click()
  cy.get(loc.CONTAS.NOME).clear().type(novaConta)
  cy.get(loc.CONTAS.BTN_SALVAR).click()
})

Cypress.Commands.add('criarMovimentacao', (desc, valor, interessado, conta) => {
  cy.get(loc.MENU.MOVIMENTACAO).click()
  cy.get(loc.MOVIMENTACAO.DESCRICAO).type(desc)
  cy.get(loc.MOVIMENTACAO.VALOR).type(valor, { force: true })
  cy.get(loc.MOVIMENTACAO.INTERESSADO).type(interessado)
  cy.get(loc.MOVIMENTACAO.CONTA).select(conta)
  cy.get(loc.MOVIMENTACAO.STATUS).click()
  cy.get(loc.MOVIMENTACAO.BTN_SALVAR).click()
})

Cypress.Commands.add('removerTransacao', conta => {
  cy.get(loc.MENU.EXTRATO).click()
  cy.xpath(loc.EXTRATO.FN_XP_REMOVER_ELEMENTO(conta)).click()
})

Cypress.Commands.add('acessarTransacao', transacao => {
  cy.get(loc.MENU.EXTRATO).click()
  cy.xpath(loc.EXTRATO.FN_XP_ALTERAR_ELEMENTO(transacao)).click()
})

Cypress.Commands.add('alterarStatusTransacao', () => {
  cy.get(loc.MOVIMENTACAO.STATUS).click()
  cy.get(loc.MOVIMENTACAO.BTN_SALVAR).click()
})