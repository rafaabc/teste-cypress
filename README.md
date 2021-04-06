# Framework de Teste Automatizado com Cypress

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=rafaabc_teste-cypress&metric=alert_status)](https://sonarcloud.io/dashboard?id=rafaabc_teste-cypress) [![teste-cypress](https://img.shields.io/endpoint?url=https://dashboard.cypress.io/badge/detailed/xxemvr&style=flat&logo=cypress)](https://dashboard.cypress.io/projects/xxemvr/runs) [![Cypress Tests using Cypress Docker Image](https://github.com/rafaabc/teste-cypress/actions/workflows/main.yml/badge.svg?branch=main)](https://github.com/rafaabc/teste-cypress/actions/workflows/main.yml)

Após treinamento realizado na [Udemy](https://www.udemy.com/course/testes-cypress/) de testes em diferentes camadas com Cypress, segue o exemplo de framework de teste a nível funcional, API e apenas frontend.

Foi utilizado o site de [testes](https://barrigareact.wcaquino.me/login) para simular os cenários de validação de saldo, criação de transação financeira, atualização e remoção, entre outros.

No cenário frontend a ferramenta permite simular as chamadas no backend pelo desvio de rota com cy.route. Entretanto, a função está deprecada e adaptei as chamadas via cy.intercept. Alguns cenários dessa suite foram impactados uma vez que a nova função ainda tem limitações como o override a partir da versão 6.0.0. Então foi apenas para fins de estudo como são os testes nessa camada. As validações mais assertivas e rápidas ainda se concentram no backend.

## Requisitos

Ferramentas:

- [VSCode](https://code.visualstudio.com/Download)
- [Cypress](https://www.cypress.io/)

Dependências:

- [Allure](https://www.npmjs.com/package/@shelex/cypress-allure-plugin)

Adicionais:

- [cypress-xpath](https://github.com/cypress-io/cypress-xpath)

## Estrutura de diretórios

```js
./projeto
├─ cypress/
    ├─ fixtures
    └─ integration/
        └─ barriga/
            ├─ backend.spec.js
            ├─ frontend.spec.js
            └─ functional.spec.js
    └─ plugins/
    └─ support/
       ├─ commands.js
       ├─ commandsContas.js
       ├─ index.js
       └─ locators.js
```

- cypress: diretório principal
- fixtures: diretório onde será construído o script de teste inicial
- plugins: diretório onde será possível estender alguns comportamentos da ferramenta
- support: diretório com arquivos de comandos customizados e elementos mapeados para os testes funcionais

## Executando via linha de comando

Foram construídos scripts que se encontram no arquivo package.json:

Abrir a ferramenta

`npm run cypress:open`

---

Rodar os teste no modo headless a depender do browser de escolha </p>

`npm run cypress:run_electron`
`npm run cypress:run_chrome`
`npm run cypress:run_firefox`

---

Rodar os testes via Cypress Dashboard\* </p>

`npm run cypress:dashboard`

\*Necessário configurar o Dashboard localmente para integração com o código

---

Rodar os testes com Allure Report </p>

`npm run test`

O script limpa os testes anteriores, cria 2 pastas "allure-report" e "allure-results"
com o novo resultado e abre automaticamente o relatório no navegador.
