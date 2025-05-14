describe('Pengujian Fitur Login dengan Intercept - OrangeHRM', () => {
    beforeEach(() => {
      cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    })

    it('TC_Login_001-Login dengan valid username dan password', () => {
      // Intercept API request saat login
      cy.intercept('GET', '**/api/v2/dashboard/employees/time-at-work*').as('timeatWork')
      cy.intercept('GET', '**/api/v2/dashboard/employees/action-summary').as('actionSummary')
      cy.intercept('GET', '**/api/v2/dashboard/shortcuts').as('shortcuts')
      cy.intercept('GET', '**/api/v2/buzz/feed*').as('feed')
      cy.intercept('GET', '**/api/v2/dashboard/employees/subunit').as('subunit')
      cy.intercept('GET', '**/api/v2/dashboard/employees/leaves*').as('leaves')
      cy.intercept('GET', '**/api/v2/dashboard/employees/locations').as('locations')
      cy.intercept('POST', '**/events/push').as('events')

      cy.get('input[name="username"]').type('Admin')
      cy.get('input[name="password"]').type('admin123')      
      cy.get('button[type="submit"]').click()

      // Tunggu request login dan verifikasi status code
      cy.wait('@timeatWork').its('response.statusCode').should('eq', 200)
      cy.wait('@actionSummary').its('response.statusCode').should('eq', 200)
      cy.wait('@shortcuts').its('response.statusCode').should('eq', 200)
      cy.wait('@feed').its('response.statusCode').should('eq', 200)
      cy.wait('@subunit').its('response.statusCode').should('eq', 200)
      cy.wait('@leaves').its('response.statusCode').should('eq', 200)
      cy.wait('@locations').its('response.statusCode').should('eq', 200)
      cy.wait('@events').its('response.statusCode').should('eq', 200)

      // Assertion pada URL dan tampilan dashboard
      cy.url().should('include', '/dashboard/index')
      cy.get('h6').should('have.text', 'Dashboard')
      cy.get('aside').should('be.visible')
      cy.get('.oxd-layout-context').should('be.visible')
    })
})