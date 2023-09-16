import type { Cypress } from 'local-cypress'
import { defineConfig } from 'cypress'
import fs from 'fs'

function deleteSuccessfulVideo(spec: Cypress.Spec, results: CypressCommandLine.RunResult): void {
  if (!results?.video) {
    return
  }

  const failures = results.tests.some((test) => test.attempts.some((attempt) => attempt.state === 'failed'))

  // delete the video if the spec passed and no tests retried
  if (!failures) {
    fs.unlinkSync(results.video)
  }
}

export const e2eConfigs: Cypress.ConfigOptions['e2e'] = {
  baseUrl: process.env.BASE_URL_TEST,
  retries: 5,
  screenshotsFolder: '../../artifact/test-media-cypress',
  setupNodeEvents(on) {
    on('after:spec', deleteSuccessfulVideo)
  },
  specPattern: 'cypress/integration/*.ts',
  supportFile: false,
  videoCompression: false,
  videosFolder: '../../artifact/test-media-cypress',
}

export default defineConfig({ e2e: e2eConfigs })
