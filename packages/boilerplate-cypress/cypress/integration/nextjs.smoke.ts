import { cy, describe, it } from 'local-cypress'

import pageNextjs from '../support/page-nextjs'

describe('Nextjs landing page', () => {
  it('contains all headings', () => {
    cy.visit(pageNextjs.pageLanding)

    cy.contains(pageNextjs.locale.landing.header)
    cy.contains(pageNextjs.locale.landing.cardDeployHeader)
    cy.contains(pageNextjs.locale.landing.cardDocumentationHeader)
    cy.contains(pageNextjs.locale.landing.cardExamplesHeader)
    cy.contains(pageNextjs.locale.landing.cardLearnHeader)
  })
})
