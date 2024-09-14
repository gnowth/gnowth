import type { ReactNode } from 'react'

import { AppEnvironment } from '@gnowth/lib-react'
import { makeDecorator } from '@storybook/preview-api'

export const withAppEnvironment = makeDecorator({
  name: 'withAppEnvironment',
  parameterName: 'libReact',
  skipIfNoParametersOrOptions: true,
  wrapper(getStory, context, { parameters }) {
    return (
      <AppEnvironment i18n={parameters.i18n} theme={parameters.theme}>
        {getStory(context) as ReactNode}
      </AppEnvironment>
    )
  },
})
