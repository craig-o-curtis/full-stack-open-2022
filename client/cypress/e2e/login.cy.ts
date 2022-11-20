describe("Login page", () => {
  beforeEach(() => {
    // cy.visit("http://localhost:3000");
  });

  it("should display login page defaults", () => {
    cy.visit("http://localhost:3000");
    // ** username
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

  it("should be able to navigate to the signup page from login", () => {
    cy.visit("http://localhost:3000");
    cy.url().should("include", "/login");
    cy.contains("Register for account").click();
    cy.url().should("include", "/signup");
  });

  it("should display signup page defaults", () => {
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

  it("should be able to navigate back to the login page from signup page", () => {
    cy.visit("http://localhost:3000/signup");
    cy.url().should("include", "/signup");
    cy.contains("Already have an account?").click();
    cy.url().should("include", "/login");
  });
});
