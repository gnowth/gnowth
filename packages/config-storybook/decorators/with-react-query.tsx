import { makeDecorator } from '@storybook/preview-api'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactNode } from 'react'

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
