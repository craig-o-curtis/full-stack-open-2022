/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
declare global {
  namespace Cypress {
    interface Chainable {
      login({
        username,
        password,
      }: {
        username: string;
        password: string;
      }): Chainable<unknown>;
    }
  }
}
// good idea, but too much happening with user context, auth routs for this at the moment
Cypress.Commands.add(
  "login",
  ({ username, password }: { username: string; password: string }) => {
    localStorage.removeItem("uhel-fullstack2022currentUser");

    return cy
      .request("POST", "http://localhost:3001/api/login", {
        username,
        password,
      })
      .then(({ body }) => {
        localStorage.setItem("loggedNoteappUser", JSON.stringify(body));

        cy.visit("http://localhost:3000");
        cy.visit("http://localhost:3000/home");
      });
  }
);
