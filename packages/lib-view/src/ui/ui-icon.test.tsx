import { describe, expect, it } from '@jest/globals'
import { screen } from '@testing-library/react'
import { FunctionComponent } from 'react'

import { testMakeRenderComponent } from '../modules/tests'
import { UIIcon } from './ui-icon'

describe('uIIcon', () => {
  type Props = { 'data-testid'?: string }
  const Icon: FunctionComponent<Props> = (props) => <div data-testid={props['data-testid']} />
  const renderComponent = testMakeRenderComponent({
    Component: UIIcon,
    props: { components: { Icon }, value: 'Icon' },
  })

  it('renders properly', async () => {
    expect.assertions(1)

    await renderComponent()

    expect(screen.queryByTestId('view-ui-icon')).toBeVisible()
  })
})
