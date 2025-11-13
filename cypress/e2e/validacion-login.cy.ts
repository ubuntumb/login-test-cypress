import LoginPage from '../pages/login-page'
import { LoginData, InvalidCredential } from '../support/types'
import loginData from '../fixtures/login-data.json'


describe('Login - Validaciones y escenario de Error', (): void => {
  const data: LoginData = loginData
  const loginPage: LoginPage = new LoginPage()

  beforeEach((): void => {
    loginPage.visit()
  })

  // Pruebas parametrizadas con tipado
  data.invalidCredentials.forEach((testCase: InvalidCredential): void => {
    it(`Debería mostrar error con ${testCase.testCase}`, (): void => {
      // TypeScript verifica que testCase tenga las propiedades correctas
      loginPage.login(testCase.username, testCase.password)
      
      // Verificar mensaje de error
      loginPage.verifyErrorMessage(testCase.expectedError)
      
      // Verificar que no se redirige
      cy.url().should('not.include', '/logged-in-successfully/')
    })
  })

  it('Debería validar que el mensaje de error sea visible', (): void => {
    // Login con credenciales inválidas
    loginPage.login('invalidUser', 'invalidPass')    
    loginPage.errorMessage
      .should('be.visible')
      .and('have.css', 'color')
  })

  it('Debería permitir reintentar login después de un error', (): void => {
    // Primer intento con credenciales inválidas
    loginPage.login('wrongUser', 'wrongPass')
    loginPage.verifyErrorMessage('Your username is invalid!')
    
    // Segundo intento con credenciales válidas (con autocompletado)
    loginPage.login(data.validUser.username, data.validUser.password)
    loginPage.verifySuccessfulLoginUrl()
    loginPage.verifySuccessMessage(data.successMessage)
  })

  it('Debería limpiar campos del formulario correctamente', (): void => {
    const testUser: string = 'testUser'
    const testPass: string = 'testPass'
    
    // Llenar el formulario
    loginPage.enterUsername(testUser)
    loginPage.enterPassword(testPass)
    
    loginPage.usernameInput.should('have.value', testUser)
    loginPage.passwordInput.should('have.value', testPass)
    
    // Limpiar y verificar
    loginPage.clearUsername()
    loginPage.clearPassword()
    
    loginPage.usernameInput.should('have.value', '')
    loginPage.passwordInput.should('have.value', '')
  })

  it('Debería validar que el campo password sea de tipo password', (): void => {
    loginPage.passwordInput.should('have.attr', 'type', 'password')
  })

  it('Debería poder escribir en los campos del formulario', (): void => {
    const testUsername: string = 'testUser123'
    const testPassword: string = 'testPass456'
    
    // Escribir en los campos con métodos tipados
    loginPage.enterUsername(testUsername)
    loginPage.enterPassword(testPassword)
    
    // Verificar valores
    loginPage.usernameInput.should('have.value', testUsername)
    loginPage.passwordInput.should('have.value', testPassword)
  })

  it('Debería mantener el foco en el formulario al interactuar', (): void => {
    // Click en username
    loginPage.usernameInput.click().should('have.focus')
    
    // Tab al siguiente campo
    loginPage.passwordInput.focus();
    loginPage.passwordInput.should('have.focus')
  })
})
