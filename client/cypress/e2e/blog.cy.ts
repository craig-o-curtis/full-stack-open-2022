import {
  clearUserFromLocalStorage,
  clearDB,
  createTestUser,
  loginToApp,
} from "../cypressUtils";

const clickBlogsRoute = () => {
  cy.contains("Blogs").click();
  cy.url().should("include", "/blogs");
};

describe("Blogs page", function () {
  beforeEach(function () {
    clearUserFromLocalStorage();
    clearDB();
    createTestUser();
    loginToApp();
    // cy.login({ username: "cypress", password: "cypress" });
    cy.visit("http://localhost:3000/home");
    clickBlogsRoute();
  });

  it("should show default blogs page", function () {
    cy.get("h1").should("contain", "Blogs");
    // should show home and add blog buttons
    cy.contains("Home").should("be.visible").and("be.enabled");
    cy.contains("Add blog").should("be.visible").and("be.enabled");
    // should show a disabled sort button
    cy.get('button[title^="Sort by"]').should("be.disabled");

    // confirm add blog page opens add blog form
    cy.contains("Add blog").click();
    cy.contains("Hide add blog form").should("be.visible").and("be.enabled");
    cy.contains("Title:")
      .find("input[type=text]")
      .should("be.visible")
      .and("be.enabled");

    cy.contains("Author:")
      .find("input[type=text]")
      .should("be.visible")
      .and("be.enabled");

    cy.contains("Url:")
      .find("input[type=url]")
      .should("be.visible")
      .and("be.enabled");

    // Submit button should be disabled
    cy.contains("Submit").should("be.visible").and("be.disabled");
  });

  // ** Confirming exercise 5.19
  it("should be able to create and delete a blog", function () {
    cy.get("h1").should("contain", "Blogs");
    // click Add blog button
    cy.contains("Add blog").click();
    //
    cy.contains("Title:").find("input[type=text]").type("Cypress blog");
    cy.contains("Author:").find("input[type=text]").type("Cypress author");
    cy.contains("Url:")
      .find("input[type=url]")
      .type("http://www.cypresstest.com");
    // Submit button should be enabled
    cy.contains("Submit").should("be.visible").and("be.enabled");
    // click Submit button
    cy.contains("Submit").click();
    // should show blog title
    cy.contains("Cypress blog").should("be.visible");
    cy.contains("Show details").should("be.visible").and("be.enabled").click();
    cy.contains("Cypress author").should("be.visible");
    cy.contains("http://www.cypresstest.com").should("be.visible");
    cy.contains("Likes: 0").should("be.visible");
    // can delete own
    cy.contains("Delete").should("be.visible").and("be.enabled").click();
    // should not show blog title
    cy.contains("Cypress blog").should("not.exist");
  });
});
