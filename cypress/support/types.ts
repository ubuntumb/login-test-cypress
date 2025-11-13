/**
 * Tipos para los datos de prueba del login
 */

export interface ValidUser {
  username: string
  password: string
}

export interface InvalidCredential {
  testCase: string
  username: string
  password: string
  expectedError: string
}

export interface LoginData {
  validUser: ValidUser
  invalidCredentials: InvalidCredential[]
  successMessage: string
  logoutMessage: string
}