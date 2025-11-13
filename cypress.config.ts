import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'https://practicetestautomation.com',
    viewportWidth: 1280,
    viewportHeight: 720,
    video: false,
    screenshotOnRunFailure: true,
    defaultCommandTimeout: 10000,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  reporter: 'mochawesome',
  reporterOptions:{
    reportDir: 'cypress/results',
    overwrite: false,
    html: true
  }
})
