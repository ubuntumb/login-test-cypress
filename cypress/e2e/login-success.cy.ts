import LoginPage from '../pages/login-page'
import { LoginData } from '../support/types'
import loginData from '../fixtures/login-data.json'

describe('Login - Con casos Exitosos', (): void => {
  const data: LoginData = loginData
  const loginPage: LoginPage = new LoginPage()

  beforeEach((): void => {
    // Visitar la página de login antes de cada prueba
    loginPage.visit()
  })

  it('Debería mostrar el formulario de login correctamente', (): void => {
    // Verificar que todos los elementos del formulario estén visibles
    loginPage.verifyFormElementsVisible()
    
    loginPage.usernameInput.should('have.attr', 'type', 'text')
    loginPage.passwordInput.should('have.attr', 'type', 'password')
  })

  it('Debería permitir login con credenciales válidas', (): void => {
    // Realizar login con credenciales válidas (con autocompletado!)
    loginPage.login(data.validUser.username, data.validUser.password)
    
    // Verificar login exitoso
    loginPage.verifySuccessfulLoginUrl()
    loginPage.verifySuccessMessage(data.successMessage)
    loginPage.verifyLogoutButtonVisible()
  })

  it('Debería permitir logout después de un login exitoso', (): void => {
    // Realizar login
    loginPage.login(data.validUser.username, data.validUser.password)
    loginPage.verifySuccessfulLoginUrl()
    
    // Hacer logout
    loginPage.clickLogout()
  })

  it('Debería mantener la sesión después de recargar la página', (): void => {
    // Realizar login
    loginPage.login(data.validUser.username, data.validUser.password)
    loginPage.verifySuccessfulLoginUrl()
    
    // Recargar la página
    cy.reload()
    
    // Verificar que la sesión se mantiene luego del reload
    loginPage.verifySuccessMessage(data.successMessage)
    loginPage.verifyLogoutButtonVisible()
  })


})
