/**
 * Page Object Model para la página de Login con TypeScript
 * Encapsula todos los selectores y acciones relacionadas con el login
 */

class LoginPage {
  // Selectores de elementos con tipado explícito
  private readonly selectors = {
    usernameInput: '#username',
    passwordInput: '#password',
    submitButton: '#submit',
    errorMessage: '#error',
    successMessage: '.post-title',
    logoutButton: '.wp-block-button > a.wp-block-button__link'
  } as const

  /**
   * Getters para elementos con retorno de Cypress
   */
  get usernameInput(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get(this.selectors.usernameInput)
  }

  get passwordInput(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get(this.selectors.passwordInput)
  }

  get submitButton(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get(this.selectors.submitButton)
  }

  get errorMessage(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get(this.selectors.errorMessage)
  }

  get successMessage(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get(this.selectors.successMessage)
  }

  get logoutButton(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get(this.selectors.logoutButton)
  }

  /**
   * Navega a la página de login
   */
  visit(): void {
    cy.visit('/practice-test-login/')
  }

  /**
   * Ingresa el nombre de usuario
   * @param username - Nombre de usuario a ingresar
   */
  enterUsername(username: string): void {
    this.usernameInput.clear().type(username)
  }

  /**
   * Ingresa la contraseña
   * @param password - Contraseña a ingresar
   */
  enterPassword(password: string): void {
    this.passwordInput.clear().type(password)
  }

  /**
   * Hace clic en el botón de submit
   */
  clickSubmit(): void {
    this.submitButton.click()
  }

  /**
   * Realiza el proceso completo de login
   * @param username - Nombre de usuario
   * @param password - Contraseña
   */
  login(username: string, password: string): void {
    if (username) this.enterUsername(username)
    if (password) this.enterPassword(password)
    this.clickSubmit()
  }

  /**
   * Verifica que se muestre el mensaje de error
   * @param expectedMessage - Mensaje de error esperado
   */
  verifyErrorMessage(expectedMessage: string): void {
    this.errorMessage
      .should('be.visible')
      .and('contain.text', expectedMessage)
  }

  /**
   * Verifica que se muestre el mensaje de éxito
   * @param expectedMessage - Mensaje de éxito esperado
   */
  verifySuccessMessage(expectedMessage: string): void {
    this.successMessage
      .should('be.visible')
      .and('contain.text', expectedMessage)
  }

  /**
   * Verifica que el botón de logout esté visible
   */
  verifyLogoutButtonVisible(): void {
    this.logoutButton
      .should('be.visible')
      .and('contain.text', 'Log out')
  }

  /**
   * Hace clic en el botón de logout
   */
  clickLogout(): void {
    this.logoutButton.click()
  }

  /**
   * Verifica que la URL sea la esperada después del login exitoso
   */
  verifySuccessfulLoginUrl(): void {
    cy.url().should('include', '/logged-in-successfully/')
  }

  /**
   * Verifica que los campos del formulario estén visibles
   */
  verifyFormElementsVisible(): void {
    this.usernameInput.should('be.visible')
    this.passwordInput.should('be.visible')
    this.submitButton.should('be.visible').and('be.enabled')
  }

  /**
   * Limpia el campo de usuario
   */
  clearUsername(): void {
    this.usernameInput.clear()
  }

  /**
   * Limpia el campo de contraseña
   */
  clearPassword(): void {
    this.passwordInput.clear()
  }

  /**
   * Obtiene el valor del campo username
   */
  getUsernameValue(): Cypress.Chainable<string> {
    return this.usernameInput.invoke('val') as Cypress.Chainable<string>
  }

  /**
   * Obtiene el valor del campo password
   */
  getPasswordValue(): Cypress.Chainable<string> {
    return this.passwordInput.invoke('val') as Cypress.Chainable<string>
  }
}

export default LoginPage
