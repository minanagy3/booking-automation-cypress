class SearchResultsPage {
  waitForResults() {
    cy.get('[data-testid="property-card"]', { timeout: 10000 }).should('be.visible')
  }

  findAndClickTolipHotel() {
    const hotelName = 'Tolip Hotel Alexandria'
    let found = false

    // Try to find on first page
    this.waitForResults()
    cy.get('[data-testid="property-card"]').each(($card) => {
      if (!$found) {
        cy.wrap($card).then(($el) => {
          const text = $el.text()
          if (text.includes('Tolip Hotel Alexandria')) {
            cy.wrap($el).find('a:contains("See availability")').first().click()
            found = true
          }
        })
      }
    }).then(() => {
      // If not found on first page, go to second page
      if (!found) {
        cy.get('button[aria-label="Next page"]').click()
        cy.wait(2000)
        this.waitForResults()
        
        cy.get('[data-testid="property-card"]').each(($card) => {
          if (!$found) {
            cy.wrap($card).then(($el) => {
              const text = $el.text()
              if (text.includes('Tolip Hotel Alexandria')) {
                cy.wrap($el).find('a:contains("See availability")').first().click()
                found = true
              }
            })
          }
        })
      }

      if (!found) {
        throw new Error('Tolip Hotel Alexandria not found in search results')
      }

      cy.url().should('include', 'hotel')
    })
  }
}

export default SearchResultsPage

