import { cy, describe, it } from 'local-cypress'

import pageNextjs from '../support/page-nextjs'

describe('Nextjs landing page', () => {
  it('contains main page', () => {
    cy.visit(pageNextjs.pageLanding)

    cy.contains(pageNextjs.locale.landing.simulateErrorButton)
    cy.contains(pageNextjs.locale.landing.simulateErrorText)
    cy.contains(pageNextjs.locale.landing.simulateNotificationButton)
    cy.contains(pageNextjs.locale.landing.simulateNotificationText)
  })
})
