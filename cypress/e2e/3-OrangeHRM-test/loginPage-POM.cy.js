import LoginPage from '../../support/pageObjects/loginPage'
import LoginData from '../../fixtures/loginData.json'

describe('Login Test - OrangeHRM with POM', () => {

  beforeEach(() => {
    LoginPage.visit()
  })

  it('TC_Login_001-Login dengan valid username dan password', () => {
    LoginPage.enterUsername(LoginData.validUsername)
    LoginPage.enterPassword(LoginData.validPassword)
    LoginPage.clickLogin()

    // Assertion: Verifikasi redirect ke dashboard
    LoginPage.getDashboard()
  })

  it('TC_Login_002-Login dengan valid username dan invalid password', () => {
    LoginPage.enterUsername(LoginData.validUsername)
    LoginPage.enterPassword(LoginData.invalidPassword)
    LoginPage.clickLogin()

    // Assertion: Pesan error ditampilkan
    LoginPage.getErrorMessage()
  })

  it('TC_Login_003-Login dengan invalid username atau tidak terdaftar', () => {
    LoginPage.enterUsername(LoginData.invalidUsername)
    LoginPage.enterPassword(LoginData.validPassword)
    LoginPage.clickLogin()

    // Assertion: Pesan error ditampilkan
    LoginPage.getErrorMessage()
  })

  it('TC_Login_004-Login dengan username kosong dan password terisi', () => {
    LoginPage.enterPassword(LoginData.validPassword)
    LoginPage.clickLogin()

    // Assertion: Menampilkan pesan 'Required' pada field username
    LoginPage.getRequiredMessage()
  })

  it('TC_Login_005-Login dengan username terisi dan password kosong', () => {
    LoginPage.enterUsername(LoginData.validUsername)
    LoginPage.clickLogin()

    // Assertion: Menampilkan pesan 'Required' pada field username
    LoginPage.getRequiredMessage()
  })

  it('TC_Login_006-Login dengan username dan password kosong', () => {
    LoginPage.clickLogin()

    // Assertion: Menampilkan pesan 'Required' pada field username
    LoginPage.getRequiredMessage()
  })

  it('TC_Login_007-Forgot password', () => {
    LoginPage.clickForgotPassword()

    // Assertion: Elemen form reset password tampil
    LoginPage.getForgotPassword()
  })
})