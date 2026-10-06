const fs = require('node:fs');
const path = require('node:path');
const { defineConfig } = require('cypress');

function readEnvFile() {
  const envPath = path.join(__dirname, 'cypress.env.json');
  return JSON.parse(fs.readFileSync(envPath, 'utf8'));
}

// Cypress does not apply baseUrl from cypress.env.json to cy.visit() on its own.
const { baseUrl } = readEnvFile();

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'Cypress test report',
    embeddedScreenshots: true,
    inlineAssets: true,
    overwrite: true,
  },
  e2e: {
    baseUrl,
    // Fixtures live under cypress/e2e/api/fixtures and cypress/e2e/ui/fixtures.
    fixturesFolder: 'cypress/e2e',
    specPattern: 'cypress/e2e/**/*.cy.js',
    supportFile: 'cypress/support/e2e.js',
    setupNodeEvents(on) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
  },
});
