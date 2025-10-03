describe("Login Component", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173"); // adjust to your dev server
  });

  it("submits login and shows alert", () => {
    // Stub window.alert
    cy.window().then((win) => {
      cy.stub(win, "stub").as("alertStub");
    });

    // Type email and password
    cy.get('input[placeholder="Email"]').type("test@example.com");
    cy.get('input[placeholder="Password"]').type("password123");

    // Click login button
    cy.contains("Login").click();

    // Check if alert was called
    cy.get("@alertStub").should("have.been.called");
  });
});
