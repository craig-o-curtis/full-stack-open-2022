import {
  clearUserFromLocalStorage,
  clearDB,
  createTestUser,
  loginToApp,
  createTestBlog,
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
    cy.get('button[title^="Sort by"]').should("be.visible");

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
  // ** Confirming exercise 5.21
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

describe("Like other user blogs", function () {
  beforeEach(function () {
    clearUserFromLocalStorage();
    clearDB();
    createTestBlog({
      title: "Cypress other user blog",
      author: "Cypress other user author",
      url: "http://www.test.com",
    });
    createTestUser();
    loginToApp();
    cy.visit("http://localhost:3000/home");
    clickBlogsRoute();
  });

  it("should be able to like other blogs", function () {
    // The keep blog is made by the root user and not deleted
    // confirm has Title keep, can open Show details button
    cy.contains("Cypress other user blog").should("be.visible");
    cy.contains("Show details").should("be.visible").and("be.enabled").click();

    cy.contains("Likes: 0").should("be.visible");
    // confirm Like button enabled and can click
    cy.get("button")
      .contains("Like")
      .should("be.visible")
      .and("be.enabled")
      .click();
    cy.contains("Likes: 1").should("be.visible");
  });
});

describe("Blog order", function () {
  // ** ensure sort button works
  beforeEach(function () {
    clearUserFromLocalStorage();
    clearDB();

    createTestBlog({
      title: "Cypress blog 1",
      author: "Cypress author 1",
      url: "http://www.cypresstest.com",
    });
    createTestBlog({
      title: "Cypress blog 2",
      author: "Cypress author 2",
      url: "http://www.cypresstest.com",
    });

    createTestUser();
    loginToApp();
    cy.visit("http://localhost:3000/home");
    clickBlogsRoute();
  });

  it.only("should sort by likes", function () {
    // Confirm both blogs visible
    cy.get(".blog-item").eq(0).should("contain", "Cypress blog 1");
    cy.get(".blog-item").eq(1).should("contain", "Cypress blog 2");

    // open first and like once, confirm still first
    cy.get(".blog-item").eq(0).contains("Show details").click();
    cy.get(".blog-item").eq(0).contains("Like").click();

    cy.get(".blog-item").eq(0).contains("Likes: 0").should("be.visible");
    // confirm Like button enabled and can click
    cy.get(".blog-item")
      .eq(0)
      .get("button")
      .contains("Like")
      .should("be.visible")
      .and("be.enabled")
      .click();
    cy.get(".blog-item").eq(0).contains("Likes: 1").should("be.visible");
    // close to avoid flake
    cy.get(".blog-item").eq(0).contains("Hide details").click();

    // open second and like twice, confirm first
    cy.get(".blog-item").eq(1).contains("Show details").click();
    cy.get(".blog-item")
      .eq(1)
      .get("button")
      .contains("Like")
      .should("be.visible")
      .and("be.enabled")
      .click();
    cy.get(".blog-item").eq(1).contains("Likes: 1").should("be.visible");
    cy.get(".blog-item")
      .eq(1)
      .get("button")
      .contains("Like")
      .should("be.visible")
      .and("be.enabled")
      .click();
    // Disregard index as flakiness ensues, assume after these two asserts the indices are correct
    cy.contains("Likes: 2").should("be.visible");
    cy.contains("Hide details").click();

    cy.get(".blog-item").eq(0).should("contain", "Cypress blog 2");
    cy.get(".blog-item").eq(1).should("contain", "Cypress blog 1");

    // cy.
  });
});
