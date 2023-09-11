import type { ReactNode } from 'react'
import { makeDecorator } from '@storybook/preview-api'
import { QueryClientProvider } from 'react-query'

export const withReactQuery = makeDecorator({
  name: 'withReactQuery',
  parameterName: 'reactQuery',
  skipIfNoParametersOrOptions: true,

  wrapper(getStory, context, { parameters }) {
    return (
      <QueryClientProvider client={parameters?.client}>{getStory(context) as ReactNode}</QueryClientProvider>
    )
  },
})
