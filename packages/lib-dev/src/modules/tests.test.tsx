import { screen } from '@testing-library/react'
import { FunctionComponent, useState } from 'react'

import { testSetupRenderComponent } from './tests.utils'

describe('testMakeRenderComponent', () => {
  let localState: string
  const testMakeRenderComponent = testSetupRenderComponent({
    loaders: [
      async (parameters) => {
        localState = parameters?.state
      },
    ],
    parameters: { state: 'setup parameters' },
  })
  const testId = 'testId'
  type Props = { value: string }
  const Component: FunctionComponent<Props> = (props) => {
    const [state, setState] = useState('state')
    return (
      <div data-testid={testId}>
        <div>{props.value}</div>
        <div>{state}</div>
        <button onClick={() => setState(localState)}>click</button>
      </div>
    )
  }
  const renderComponent = testMakeRenderComponent({ Component, props: { value: 'val' } })

  it('render propperly', async () => {
    expect.assertions(2)
    await renderComponent()
    expect(screen.getByTestId(testId)).toBeVisible()
    expect(screen.getByText('val')).toBeVisible()
  })

  it('rerender propperly', async () => {
    expect.assertions(2)
    const { rerender } = await renderComponent({ props: { value: 'val1' } })
    expect(screen.getByText('val1')).toBeVisible()
    await rerender({ props: { value: 'val2' } })
    expect(screen.getByText('val2')).toBeVisible()
  })

  it('run loaders properly', async () => {
    expect.assertions(3)
    const { rerender, user } = await renderComponent({ props: { value: 'val1' } })
    expect(screen.getByText('state')).toBeVisible()

    await user.click(screen.getByRole('button'))
    expect(await screen.findByText('setup parameters')).toBeVisible()

    await rerender({ parameters: { state: 'rerender state' } })
    await user.click(screen.getByRole('button'))
    expect(await screen.findByText('rerender state')).toBeVisible()
  })

  it('supports empty parameters', async () => {
    expect.assertions(1)
    const renderComponent1 = testSetupRenderComponent()({ Component })
    await renderComponent1()
    expect(screen.getByTestId(testId)).toBeVisible()
  })
})
