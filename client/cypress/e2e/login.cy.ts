import {
  clearDB,
  createTestUser,
  clearUserFromLocalStorage,
} from "../cypressUtils";

// ** Confirming exercise 5.18
describe("Login page", function () {
  beforeEach(function () {
    clearDB();
    clearUserFromLocalStorage();
    createTestUser();
  });

  it("should display login page defaults", function () {
    cy.visit("http://localhost:3000");
    // ** username
    // ** searching by label name and not CSS selector input:first etc for better testing readability
    cy.contains("Username:")
      .should("be.visible")
      .find("input[type=text]")
      .should("exist")
      .should("be.enabled");
    // ** password
    cy.contains("Password:")
      .should("be.visible")
      .find("input[type=password]")
      .should("exist")
      .should("be.enabled");
    // ** register link
    cy.contains("Register for account")
      .should("be.visible")
      .should("have.attr", "href", "/signup");
    // ** disabled submit button
    cy.contains("Submit").should("be.visible").should("be.disabled");

    // ** submit button enables after entering username and password
    cy.get("input[type=text]").type("test");
    cy.get("input[type=password]").type("test");
    cy.contains("Submit").should("be.enabled");
  });

  it("should be able to navigate to the signup page from login", function () {
    cy.visit("http://localhost:3000");
    cy.url().should("include", "/login");
    cy.contains("Register for account").click();
    cy.url().should("include", "/signup");
  });

  it("should display signup page defaults", function () {
    cy.visit("http://localhost:3000/signup");
    // ** username
    cy.contains("Username:")
      .should("be.visible")
      .find("input[type=text]")
      .should("exist")
      .should("be.enabled");
    // ** name
    cy.contains("Name:")
      .should("be.visible")
      .find("input[type=text]")
      .should("exist")
      .should("be.enabled");
    // ** password
    cy.contains("Password:")
      .should("be.visible")
      .find("input[type=password]")
      .should("exist")
      .should("be.enabled");
    // ** already have an accoun tlink
    cy.contains("Already have an account?")
      .should("be.visible")
      .should("have.attr", "href", "/login");
    // ** disabled submit button
    cy.contains("Submit").should("be.visible").should("be.disabled");

    // ** submit button enables after entering username, name,  and password
    cy.contains("Username:").find("input[type=text]").type("test");
    cy.contains("Name:").find("input[type=text]").type("test");
    cy.contains("Password:").find("input[type=password]").type("test");
    cy.contains("Submit").should("be.enabled");
  });

  it("should be able to navigate back to the login page from signup page", function () {
    cy.visit("http://localhost:3000/signup");
    cy.url().should("include", "/signup");
    cy.contains("Already have an account?").click();
    cy.url().should("include", "/login");
  });

  it("should be able to login with example user", function () {
    // example user is cypress root
    cy.visit("http://localhost:3000");
    cy.contains("Username:").find("input[type=text]").type("cypress");
    cy.contains("Password:").find("input[type=password]").type("cypress");
    cy.contains("Submit").click();
    cy.url().should("include", "/home");
    cy.contains("Full Stack 2022 Course Projects").should("be.visible");
    // should be able to log out
    cy.contains("Log out").click();
    cy.url().should("include", "/login");
  });

  it("should fail on incorrect username", function () {
    cy.visit("http://localhost:3000");
    cy.contains("Username:").find("input[type=text]").type("incorrect");
    cy.contains("Password:").find("input[type=password]").type("cypress");
    cy.contains("Submit").click();
    cy.contains("invalid username or password").should("be.visible");
  });

  it("should fail on incorrect password", function () {
    cy.visit("http://localhost:3000");
    cy.contains("Username:").find("input[type=text]").type("cypress");
    cy.contains("Password:").find("input[type=password]").type("incorrect");
    cy.contains("Submit").click();
    cy.contains("invalid username or password").should("be.visible");
  });
});
