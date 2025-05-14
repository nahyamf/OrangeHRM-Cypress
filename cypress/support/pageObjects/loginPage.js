class LoginPage {
  visit() {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
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
    return cy.get('.oxd-layout-context')
  }

  getErrorMessage() {
    return cy.get('.oxd-alert-content-text')
  }

  getRequiredMessage() {
    return cy.get('.oxd-input-field-error-message')
  }

  getForgotPassword() {
    return cy.get('.orangehrm-card-container')
  }
}

export default LoginPage