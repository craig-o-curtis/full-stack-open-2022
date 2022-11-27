export function clearUserFromLocalStorage() {
  localStorage.removeItem("uhel-fullstack2022currentUser");
}

export function clearDB() {
  cy.request("POST", "http://localhost:3001/api/testing/reset");
}

export function createTestUser() {
  cy.request("POST", "http://localhost:3001/api/testing/test-user");
}

export function loginToApp() {
  cy.intercept("/api/login").as("login");
  cy.visit("http://localhost:3000/login");

  cy.contains("Username:").find("input[type=text]").type("cypress");
  cy.contains("Password:").find("input[type=password]").type("cypress");
  cy.contains("Submit").click();

  cy.wait("@login");
  cy.url().should("include", "/home");

  //   const promise = new Promise((resolve, reject) => {
  //     cy.intercept("/api/login").as("login");
  //     cy.visit("http://localhost:3000/login");

  //     cy.contains("Username:").find("input[type=text]").type("cypress");
  //     cy.contains("Password:").find("input[type=password]").type("cypress");
  //     cy.contains("Submit").click();

  //     cy.wait("@login").then((interceptor) => {
  //       expect(interceptor?.response?.statusCode).to.equal(200);
  //       cy.url().should("include", "/home");

  //       resolve(true);
  //     });
  //   });
  //   return promise;
}
