class HomePage {
  navigate() {
    cy.visit('/')
    cy.acceptCookies()
  }

  searchLocation(location) {
    cy.get('input[name="ss"]').clear().type(location)
    cy.wait(1000) // Wait for autocomplete
    cy.get('input[name="ss"]').type('{downarrow}')
    cy.get('input[name="ss"]').type('{enter}')
  }

  selectCheckInDate(date) {
    cy.get('button[data-testid="date-display-field-start"]').click()
    const dateString = this.formatDateForBooking(date)
    cy.get(`span[data-date="${dateString}"]`).click()
  }

  selectCheckOutDate(date) {
    const dateString = this.formatDateForBooking(date)
    cy.get(`span[data-date="${dateString}"]`).click()
  }

  clickSearch() {
    cy.get('button[type="submit"]').click()
    cy.url().should('include', 'searchresults')
  }

  formatDateForBooking(date) {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  searchHotel(location, checkIn, checkOut) {
    this.searchLocation(location)
    this.selectCheckInDate(checkIn)
    this.selectCheckOutDate(checkOut)
    this.clickSearch()
  }
}

export default HomePage

