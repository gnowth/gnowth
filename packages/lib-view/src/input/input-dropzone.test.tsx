import { screen } from '@testing-library/react'

import { testMakeRenderComponent } from '../modules/tests'
import { InputDropzone } from './input-dropzone'

describe('InputDropzone', () => {
  const renderComponent = testMakeRenderComponent({ Component: InputDropzone })

  it('renders properly', async () => {
    expect.assertions(1)
    await renderComponent()
    expect(screen.queryByTestId('view-input-dropzone')).toBeVisible()
  })
})
