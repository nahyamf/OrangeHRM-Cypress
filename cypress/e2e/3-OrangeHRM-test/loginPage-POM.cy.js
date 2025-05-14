import LoginPage from '../../support/pageObjects/loginPage'

describe('Login Test - OrangeHRM with POM', () => {
  const loginPage = new LoginPage()

  beforeEach(() => {
    loginPage.visit()
  })

  it('TC_Login_001-Login dengan valid username dan password', () => {
    loginPage.enterUsername('Admin')
    loginPage.enterPassword('admin123')
    loginPage.clickLogin()

    // Assertion: Verifikasi redirect ke dashboard
    loginPage.getDashboard().should('be.visible')
  })

  it('TC_Login_002-Login dengan valid username dan invalid password', () => {
    loginPage.enterUsername('Admin')
    loginPage.enterPassword('admin1234')
    loginPage.clickLogin()

    // Assertion: Pesan error ditampilkan
    loginPage.getErrorMessage().should('have.text', 'Invalid credentials')
  })

  it('TC_Login_003-Login dengan invalid username atau tidak terdaftar', () => {
    loginPage.enterUsername('Adminn')
    loginPage.enterPassword('admin123')
    loginPage.clickLogin()

    // Assertion: Pesan error ditampilkan
    loginPage.getErrorMessage().should('have.text', 'Invalid credentials')
  })

  it('TC_Login_004-Login dengan username kosong dan password terisi', () => {
    loginPage.enterPassword('admin123')
    loginPage.clickLogin()

    // Assertion: Menampilkan pesan 'Required' pada field username
    loginPage.getRequiredMessage().should('contain.text', 'Required')
  })

  it('TC_Login_005-Login dengan username terisi dan password kosong', () => {
    loginPage.enterUsername('Admin')
    loginPage.clickLogin()

    // Assertion: Menampilkan pesan 'Required' pada field username
    loginPage.getRequiredMessage().should('contain.text', 'Required')
  })

  it('TC_Login_006-Login dengan username dan password kosong', () => {
    loginPage.clickLogin()

    // Assertion: Menampilkan pesan 'Required' pada field username
    loginPage.getRequiredMessage().should('contain.text', 'Required')
  })

  it('TC_Login_007-Forgot password', () => {
    loginPage.clickForgotPassword()

    // Assertion: Elemen form reset password tampil
    loginPage.getForgotPassword().should('be.visible')
  })
})