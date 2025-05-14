describe('Pengujian Halaman Dashboard OrangeHRM', () => {
    it('TC_Dashboard_001-Menampilkan komponen dashboard setelah login', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    
        // Login
        cy.xpath('//input[@name="username"]').type('Admin')
        cy.get('input[name="password"]').type('admin123')
        cy.get('button[type="submit"]').click()

        // Assertion: URL dashboard
        cy.url().should('include', '/dashboard/index')
    
        // Assertion: Judul dashboard
        cy.get('h6').should('have.text', 'Dashboard')
    
        // Assertion: Sidebar muncul
        cy.get('aside').should('be.visible')

        // Assertion: Dashboard widgets muncul
        cy.get('.oxd-layout-context').should('be.visible')
    })

    it('TC_Dashboard_002-Mencoba akses langsung dashboard tanpa login', () => {
        // Membersihkan session/cookie untuk memastikan belum login
        cy.clearCookies()
        cy.clearLocalStorage()

        // Akses langsung ke halaman dashboard
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index', {
            failOnStatusCode: false
        })
            
        // Assertion: Harus redirect ke halaman login
        cy.url().should('include', '/auth/login')
    
        // Assertion: Field login muncul
        cy.xpath('//input[@name="username"]').should('be.visible')
        cy.get('input[name="password"]').should('be.visible')
        cy.get('button[type="submit"]').should('be.visible')
    })
})