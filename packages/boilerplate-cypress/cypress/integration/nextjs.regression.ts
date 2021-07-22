import { cy, describe, it } from 'local-cypress'

import pageNextjs from '../support/page-nextjs'

describe('Nextjs landing page', () => {
  it('contains all headings', () => {
    cy.visit(pageNextjs.pageLanding)

    cy.contains(pageNextjs.locale.landing.header)
    cy.contains(pageNextjs.locale.landing.cardDeployDescription)
    cy.contains(pageNextjs.locale.landing.cardDocumentationDescription)
    cy.contains(pageNextjs.locale.landing.cardExamplesDescription)
    cy.contains(pageNextjs.locale.landing.cardLearnDescription)
  })
})
