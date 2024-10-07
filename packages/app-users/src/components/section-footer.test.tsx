import { waitFor } from '@testing-library/react'

import { testMakeRenderComponent } from '../modules/tests'
import { SectionFooter } from './section-footer'
import { SectionFooterTestModel } from './section-footer.testModels'

describe('section-footer', () => {
  const renderComponent = testMakeRenderComponent({ Component: SectionFooter })

  it('renders properly', async () => {
    expect.assertions(1)
    await renderComponent()
    await waitFor(() => expect(SectionFooterTestModel.copyright).toBeVisible())
  })
})
