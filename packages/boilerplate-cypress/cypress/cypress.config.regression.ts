import { defineConfig } from 'cypress'

import { e2eConfigs } from './cypress.config.mock'

export default defineConfig({
  e2e: {
    ...e2eConfigs,
    excludeSpecPattern: 'cypress/integration/*.mock.ts',
  },
})
