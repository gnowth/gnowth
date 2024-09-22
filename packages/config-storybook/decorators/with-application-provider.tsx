import { makeDecorator } from '@storybook/preview-api'
import { Fragment, ReactNode } from 'react'

export const withApplicationProvider = makeDecorator({
  name: 'withApplicationProvider',
  parameterName: 'libReact',
  skipIfNoParametersOrOptions: true,
  wrapper(getStory, context, { parameters }) {
    const Provider = parameters.Provider ?? Fragment
    return <Provider>{getStory(context) as ReactNode}</Provider>
  },
})
