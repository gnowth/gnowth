import { defineConfig } from 'cypress'
import { deleteAsync } from 'del'

// Note: cypress does not support module from 'del' library [cypress v10.3.1 / del v7.0.0]
export default defineConfig({
  e2e: {
    baseUrl: process.env.CYPRESS_BASEURL,
    screenshotsFolder: 'cypress/media',
    specPattern: 'cypress/integration/*.ts',
    supportFile: 'cypress/support/page-nextjs.ts',
    videoCompression: false,
    videosFolder: 'cypress/media',
    setupNodeEvents: (on) => {
      /** Note: Delete video if test succeed.
       *  Link: https://github.com/cypress-io/cypress/issues/2522#issuecomment-749316813
       */
      on('after:spec', (spec, results) => {
        if (results.stats.failures === 0 && results.video) {
          return deleteAsync(results.video)
        }
      })
    },
  },
})
