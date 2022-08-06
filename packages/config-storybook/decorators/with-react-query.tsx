import type { ReactNode } from 'react'
import { makeDecorator } from '@storybook/addons'
import { QueryClientProvider } from 'react-query'

const withReactQuery = makeDecorator({
  name: 'withReactQuery',
  parameterName: 'reactQuery',
  skipIfNoParametersOrOptions: true,

  wrapper(getStory, context, { parameters }) {
    return (
      <QueryClientProvider client={parameters?.client}>{getStory(context) as ReactNode}</QueryClientProvider>
    )
  },
})

export default withReactQuery
