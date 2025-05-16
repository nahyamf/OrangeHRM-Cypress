class LoginPage {
  visit() {
    cy.visit('/auth/login')
  }

  enterUsername(username) {
    cy.get('input[name="username"]').clear().type(username)
  }

  enterPassword(password) {
    cy.get('input[name="password"]').clear().type(password)
  }

  clickLogin() {
    cy.get('button[type="submit"]').click()
  }

  clickForgotPassword() {
    cy.get('.orangehrm-login-forgot').click()
  }

  getDashboard() {
    return cy.get('.oxd-layout-context').should('be.visible')
  }

  getErrorMessage() {
    return cy.get('.oxd-alert-content-text').should('have.text', 'Invalid credentials')
  }

  getRequiredMessage() {
    return cy.get('.oxd-input-field-error-message').should('contain.text', 'Required')
  }

  getForgotPassword() {
    return cy.get('.orangehrm-card-container').should('be.visible')
  }
}

export default new LoginPage