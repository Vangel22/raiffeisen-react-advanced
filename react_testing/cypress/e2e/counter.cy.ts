describe("template spec", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });

  it("shows initial count", () => {
    cy.contains("0 clicks").should("exist");
  });

  it("increments", () => {
    cy.contains("Click me").click();
    cy.contains("1 clicks").should("exist");

    cy.contains("Click me").click();
    cy.contains("2 clicks").should("exist");
  });
});
