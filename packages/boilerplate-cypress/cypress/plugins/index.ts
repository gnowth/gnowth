import type { Cypress } from 'local-cypress'
import del from 'del'

const plugins = (on: Cypress.PluginEvents): void => {
  /** Note: Delete video if test succeed.
   *  Link: https://github.com/cypress-io/cypress/issues/2522#issuecomment-749316813
   */
  on('after:spec', (spec: Cypress.Spec, results: CypressCommandLine.RunResult): void => {
    if (results.stats.failures === 0 && results.video) del(results.video)
  })
}

export default plugins
