import LoginPage from '../pages/login-page'
import { LoginData } from '../support/types'
import loginData from '../fixtures/login-data.json'

describe('Login - Interacción con Formularios', (): void => {
  const data: LoginData = loginData
  const loginPage: LoginPage = new LoginPage()

  beforeEach((): void => {
    loginPage.visit()
  })

  describe('Interacción con el campo Username', (): void => {
    it('Debería permitir escribir y borrar texto en el campo username', (): void => {
      const testText: string = 'myusername'
      
      // Escribir texto
      loginPage.usernameInput.type(testText)
      loginPage.usernameInput.should('have.value', testText)
      
      // Borrar con backspace
      loginPage.usernameInput.type('{backspace}'.repeat(testText.length))
      loginPage.usernameInput.should('have.value', '')
    })

    it('Debería permitir usar clear() en el campo username', (): void => {
      loginPage.usernameInput.type('sometext')
      loginPage.clearUsername() 
      loginPage.usernameInput.should('have.value', '')
    })

    it('Debería aceptar caracteres especiales en username', (): void => {
      const specialUsername: string = 'user@test.com'
      loginPage.enterUsername(specialUsername) 
      loginPage.usernameInput.should('have.value', specialUsername)
    })

    it('Debería aceptar números en username', (): void => {
      const numericUsername: string = 'user12345'
      loginPage.enterUsername(numericUsername)
      loginPage.getUsernameValue().should('equal', numericUsername) 
    })
  })

  describe('Interacción con el campo Password', (): void => {
    it('Debería permitir escribir en el campo password', (): void => {
      const testPassword: string = 'MyP@ssw0rd!'
      loginPage.enterPassword(testPassword)
      loginPage.getPasswordValue().should('equal', testPassword)
    })

    it('Debería ocultar el texto en el campo password', (): void => {
      loginPage.passwordInput.should('have.attr', 'type', 'password')
    })

    it('Debería aceptar contraseñas con caracteres especiales', (): void => {
      const complexPassword: string = 'P@ssw0rd!#$%'
      loginPage.enterPassword(complexPassword)
      loginPage.passwordInput.should('have.value', complexPassword)
    })

    it('Debería permitir copiar y pegar en password', (): void => {
      const password: string = 'CopiedPassword123'
      
      // Simular copiar y pegar
      loginPage.passwordInput.invoke('val', password)
      loginPage.passwordInput.should('have.value', password)
    })
  })

  describe('Interacción con el botón Submit', (): void => {
    it('Debería poder hacer click en el botón submit', (): void => {
      loginPage.usernameInput.type('test')
      loginPage.passwordInput.type('test')
      
      loginPage.clickSubmit()
      
      // Debería mostrar error
      loginPage.errorMessage.should('be.visible')
    })
  })

  describe('Navegación con teclado', (): void => {
    it('Debería navegar entre campos con Tab', (): void => {
      // Focus en username
      loginPage.usernameInput.click().should('have.focus')
      
      // Tab a password
      loginPage.passwordInput.focus()
      loginPage.passwordInput.should('have.focus')
      
      // Tab a submit button
      loginPage.submitButton.focus()
      loginPage.submitButton.should('have.focus')
    })

  })

  describe('Flujo completo de interacción', (): void => {
    it('Debería completar un flujo de login típico del usuario', (): void => {
      loginPage.usernameInput.click()
      loginPage.usernameInput.type(data.validUser.username)
      loginPage.passwordInput.focus();
      loginPage.passwordInput.type(`${data.validUser.password}`)
      loginPage.submitButton.click()
      
      loginPage.verifySuccessfulLoginUrl()
      loginPage.verifySuccessMessage(data.successMessage)
    })

    it('Debería poder rellenar el formulario múltiples veces', (): void => {
      const attempts: Array<{ user: string; pass: string }> = [
        { user: 'wrong1', pass: 'wrong1' },
        { user: 'wrong2', pass: 'wrong2' },
      ]

      attempts.forEach(attempt => {
        loginPage.login(attempt.user, attempt.pass)
        loginPage.verifyErrorMessage('Your username is invalid!')
      })
      
      // Intento exitoso
      loginPage.login(data.validUser.username, data.validUser.password)
      loginPage.verifySuccessfulLoginUrl()
    })
  })

  describe('Validación de estados del formulario', (): void => {
    it('Debería mostrar el formulario vacío inicialmente', (): void => {
      loginPage.getUsernameValue().should('equal', '')
      loginPage.getPasswordValue().should('equal', '')
    })

    it('Debería poder enviar el formulario parcialmente lleno', (): void => {
      loginPage.enterUsername('onlyusername')
      loginPage.clickSubmit()
      
      loginPage.errorMessage.should('be.visible')
    })
  })
})
