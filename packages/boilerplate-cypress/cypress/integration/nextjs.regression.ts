import { cy, describe, it } from 'local-cypress'

import pageNextjs from '../support/page-nextjs'

describe('Nextjs landing page', () => {
	it('contains footer', () => {
		cy.visit(pageNextjs.pageLanding)

		cy.contains(pageNextjs.locale.landing.footer)
		cy.contains(pageNextjs.locale.landing.versionCurrent)
	})

	it('contains header bar', () => {
		cy.visit(pageNextjs.pageLanding)

		cy.contains(pageNextjs.locale.landing.headerAuthLogin)
		cy.contains(pageNextjs.locale.landing.headerAuthSignup)
		cy.contains(pageNextjs.locale.landing.headerTitle)
	})

	it('contains nav bar', () => {
		cy.visit(pageNextjs.pageLanding)

		cy.contains(pageNextjs.locale.landing.headerNavDashboard)
		cy.contains(pageNextjs.locale.landing.headerNavMembers)
		cy.contains(pageNextjs.locale.landing.headerNavReports)
		cy.contains(pageNextjs.locale.landing.headerNavTeams)
	})

	it('contains main page', () => {
		cy.visit(pageNextjs.pageLanding)

		cy.contains(pageNextjs.locale.landing.simulateErrorButton)
		cy.contains(pageNextjs.locale.landing.simulateErrorText)
		cy.contains(pageNextjs.locale.landing.simulateNotificationButton)
		cy.contains(pageNextjs.locale.landing.simulateNotificationText)
	})
})
