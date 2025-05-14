describe('Pengujian Halaman Login OrangeHRM', () => {
    beforeEach(() => {
      cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    })
  
    it('TC_Login_001-Login dengan valid username dan password', () => {
      cy.xpath('//input[@name="username"]').type('Admin')
      cy.get('input[name="password"]').type('admin123')
      cy.get('button[type="submit"]').click()
  
      // Assertion: Verifikasi redirect ke dashboard
      cy.url().should('include', '/dashboard/index')
      cy.get('h6').should('have.text', 'Dashboard')
      cy.get('aside').should('be.visible')
      cy.get('.oxd-layout-context').should('be.visible')
    })
  
    it('TC_Login_002-Login dengan valid username dan invalid password', () => {
      cy.xpath('//input[@name="username"]').type('Admin')
      cy.get('input[name="password"]').type('admin1234')
      cy.get('button[type="submit"]').click()
  
      // Assertion: Pesan error ditampilkan
      cy.get('.oxd-alert-content-text').should('have.text', 'Invalid credentials')
    })
  
    it('TC_Login_003-Login dengan invalid username atau tidak terdaftar', () => {
      cy.xpath('//input[@name="username"]').type('Adminn')
      cy.get('input[name="password"]').type('admin123')
      cy.get('button[type="submit"]').click()
  
      // Assertion: Pesan error ditampilkan
      cy.get('.oxd-alert-content-text').should('have.text', 'Invalid credentials')
    })
  
    it('TC_Login_004-Login dengan username kosong dan password terisi', () => {
      cy.xpath('//input[@name="username"]').should('be.visible').clear()
      cy.get('input[name="password"]').type('admin123')
      cy.get('button[type="submit"]').click()
  
      // Assertion: Menampilkan pesan 'Required' pada field username
      cy.get('.oxd-input-field-error-message').should('contain.text', 'Required')
    })
  
    it('TC_Login_005-Login dengan username terisi dan password kosong', () => {
      cy.xpath('//input[@name="username"]').type('Admin')
      cy.get('input[name="password"]').should('be.visible').clear()
      cy.get('button[type="submit"]').click()
  
      // Assertion: Menampilkan pesan 'Required' pada field password
      cy.get('.oxd-input-field-error-message').should('contain.text', 'Required')
    })
  
    it('TC_Login_006-Login dengan username dan password kosong', () => {
      cy.get('button[type="submit"]').click()
  
      // Assertion: Validasi field username dan password
      cy.get('.oxd-input-field-error-message').should('contain.text', 'Required')
    })
  
    it('TC_Login_007-Forgot password', () => {
      // Klik link "Forgot your password?"
      cy.get('.orangehrm-login-forgot').click()
  
      // Assertion: URL berubah ke halaman reset password
      cy.url().should('include', '/requestPasswordResetCode')
  
      // Assertion: Elemen form reset password tampil
      cy.get('.orangehrm-card-container').should('be.visible')
    })
}) 