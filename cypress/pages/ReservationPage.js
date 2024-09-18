class ReservationPage {
  waitForPageLoad() {
    cy.contains('Tolip Hotel Alexandria', { timeout: 10000 }).should('be.visible')
    cy.wait(2000)
  }

  getHotelName() {
    return cy.contains('Tolip Hotel Alexandria').invoke('text')
  }

  verifyHotelName(expectedName) {
    cy.contains('Tolip Hotel Alexandria').should('be.visible')
    cy.contains('Tolip Hotel Alexandria').should('contain', expectedName)
  }
}

export default ReservationPage

