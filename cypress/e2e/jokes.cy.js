describe("Jokes App", () => {
  it("should display a joke", () => {
    cy.visit("http://localhost:5173");
    cy.contains("Next Joke").click();
    cy.get(".joke-card").should("exist");
  });

  it("should allow voting", () => {
    cy.visit("http://localhost:5173");
    cy.get(".emoji-btn").first().click();
    cy.get(".emoji-btn").first().should("contain", "1");
  });
});
