// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

Cypress.Commands.add('acceptCookies', () => {
  cy.get('body').then(($body) => {
    if ($body.find('#onetrust-accept-btn-handler').length > 0) {
      cy.get('#onetrust-accept-btn-handler').click()
    }
  })
})

Cypress.Commands.add('formatDateForBooking', (date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
})

