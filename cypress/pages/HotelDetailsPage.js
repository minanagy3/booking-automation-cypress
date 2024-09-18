class HotelDetailsPage {
  waitForPageLoad() {
    cy.get('[data-testid="date-display-field-start"]', { timeout: 10000 }).should('be.visible')
    cy.wait(2000)
  }

  getCheckInDate() {
    return cy.get('[data-testid="date-display-field-start"]').invoke('text')
  }

  getCheckOutDate() {
    return cy.get('[data-testid="date-display-field-end"]').invoke('text')
  }

  selectBedAndAmount() {
    // Try to select bed type if dropdown exists
    cy.get('body').then(($body) => {
      if ($body.find('select').length > 0) {
        cy.get('select').first().select(0)
      }
    })

    // Try to select amount if input exists
    cy.get('body').then(($body) => {
      if ($body.find('input[type="number"]').length > 0) {
        cy.get('input[type="number"]').first().clear().type('1')
      }
    })

    cy.wait(1000)
  }

  clickReserveButton() {
    cy.get('button:contains("I\'ll reserve")').scrollIntoView()
    cy.get('button:contains("I\'ll reserve")').click()
    cy.url().should('include', 'checkout')
  }
}

export default HotelDetailsPage

