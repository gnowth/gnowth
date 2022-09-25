import { cy, describe, it } from 'local-cypress'

import pageUsers from '../support/page-users'

describe('Users landing page', () => {
  it('contains footer', () => {
    cy.visit(pageUsers.pageLanding)

    cy.contains(pageUsers.locale.landing.footer)
    cy.contains(pageUsers.locale.landing.versionCurrent)
  })

  it('contains header bar', () => {
    cy.visit(pageUsers.pageLanding)

    cy.contains(pageUsers.locale.landing.headerAuthLogin)
    cy.contains(pageUsers.locale.landing.headerAuthSignup)
    cy.contains(pageUsers.locale.landing.headerTitle)
  })

  it('contains nav bar', () => {
    cy.visit(pageUsers.pageLanding)

    cy.contains(pageUsers.locale.landing.headerNavDashboard)
    cy.contains(pageUsers.locale.landing.headerNavMembers)
    cy.contains(pageUsers.locale.landing.headerNavReports)
    cy.contains(pageUsers.locale.landing.headerNavTeams)
  })
})
