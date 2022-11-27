export function clearUserFromLocalStorage() {
  localStorage.removeItem("uhel-fullstack2022currentUser");
}

export function clearDB() {
  cy.request("POST", "http://localhost:3001/api/testing/reset");
}

export function createTestUser() {
  cy.request("POST", "http://localhost:3001/api/testing/test-user");
}

export function loginToApp(username?: string, password?: string) {
  cy.intercept("/api/login").as("login");
  cy.visit("http://localhost:3000/login");
  localStorage.removeItem("uhel-fullstack2022currentUser");

  cy.contains("Username:")
    .find("input[type=text]")
    .type(username ?? "cypress");
  cy.contains("Password:")
    .find("input[type=password]")
    .type(password ?? "cypress");
  cy.contains("Submit").click();

  cy.wait("@login").then((interceptor) => {
    expect(interceptor?.response?.statusCode).to.equal(200);
    localStorage.setItem(
      "uhel-fullstack2022currentUser",
      JSON.stringify(interceptor?.response?.body)
    );
    cy.url().should("include", "/home");
  });
}

export function createTestBlog({ title, author, url }) {
  cy.request("POST", "http://localhost:3001/api/login", {
    username: "root",
    password: "1234",
  }).then(({ body }) => {
    cy.request({
      url: "http://localhost:3001/api/blogs",
      method: "POST",
      body: {
        title,
        author,
        url,
      },
      headers: {
        Authorization: `Bearer ${body.token}`,
      },
    });
  });
}
