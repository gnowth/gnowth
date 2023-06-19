import { defineConfig } from 'cypress'

import { e2eConfigs } from './cypress.config.mock'

export default defineConfig({
  e2e: {
    ...e2eConfigs,
    specPattern: 'cypress/integration/*.smoke.ts',
  },
})
