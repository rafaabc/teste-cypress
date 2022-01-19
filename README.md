# Framework of automated GUI tests with Cypress

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=rafaabc_teste-cypress&metric=alert_status)](https://sonarcloud.io/dashboard?id=rafaabc_teste-cypress) [![teste-cypress](https://img.shields.io/endpoint?url=https://dashboard.cypress.io/badge/detailed/xxemvr&style=flat&logo=cypress)](https://dashboard.cypress.io/projects/xxemvr/runs) [![Cypress Tests using Cypress Docker Image](https://github.com/rafaabc/teste-cypress/actions/workflows/main.yml/badge.svg?branch=main)](https://github.com/rafaabc/teste-cypress/actions/workflows/main.yml)

After attending a test automation course with Cypress (https://www.udemy.com/course/testes-cypress/) in different layers, here is an example of a framework to test functionally, in the API layer and in the frontend component.

The [test](https://barrigareact.wcaquino.me/login) website was used to simulate the balance validation, financial transaction creation, update and removal scenarios, among others.

In the frontend scenario, the tool allows simulating the backend calls by route deviation with cy.route. However, the function is deprecated and I adapted the calls via cy.intercept. Some scenarios in this suite were impacted as the new function still has limitations such as override as of version 6.0.0. So it was just to study what the tests are like in this layer. The most assertive and fastest validations still focus on the backend.


## Requirements

Tools:

- [VSCode](https://code.visualstudio.com/Download)
- [Cypress](https://www.cypress.io/)

Dependencies:

- [Allure](https://www.npmjs.com/package/@shelex/cypress-allure-plugin)

Additional:

- [cypress-xpath](https://github.com/cypress-io/cypress-xpath)

## Directory Structure

```js
./project
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

- cypress: main directory
- fixtures: directory where the initial test script will be built
- plugins: directory where it will be possible to extend some tool behaviors
- support: directory with custom command files and elements mapped to the functional tests


## Running via command line

Scripts were built that can be found in the package.json file:

Open the tool

`npm run cypress:open`

---

Run the tests in headless mode depending on the browser of choice
 </p>

`npm run cypress:run_electron`
`npm run cypress:run_chrome`
`npm run cypress:run_firefox`

---

Run tests via Cypress Dashboard\*</p>

`npm run cypress:dashboard`

\*Need to configure Dashboard locally for code integration


---

Run tests with Allure Report </p>

`npm run test`

The script cleans the previous tests, creates 2 folders "allure-report" and "allure-results"
with the new result and automatically opens the report in the browser.
