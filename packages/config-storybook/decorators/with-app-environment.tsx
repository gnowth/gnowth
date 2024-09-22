import { AppEnvironment } from '@gnowth/lib-react'
import { makeDecorator } from '@storybook/preview-api'
import { ReactNode } from 'react'

export const withAppEnvironment = makeDecorator({
  name: 'withAppEnvironment',
  parameterName: 'libReact',
  skipIfNoParametersOrOptions: true,
  wrapper(getStory, context, { parameters }) {
    return <AppEnvironment theme={parameters.theme}>{getStory(context) as ReactNode}</AppEnvironment>
  },
})
