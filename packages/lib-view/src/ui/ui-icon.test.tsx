import type { FunctionComponent } from 'react'

import { screen } from '@testing-library/react'

import { testMakeRenderComponent } from '../modules/tests'
import { UIIcon } from './ui-icon'

describe('UIIcon', () => {
  type Props = { 'data-testid'?: string }
  const Icon: FunctionComponent<Props> = (props) => <div data-testid={props['data-testid']} />
  const renderComponent = testMakeRenderComponent({ Component: UIIcon, props: { components: { Icon } } })

  it('renders properly', async () => {
    expect.assertions(1)
    await renderComponent({ props: { value: 'Icon' } })
    expect(screen.queryByTestId('view-ui-icon')).toBeVisible()
  })
})