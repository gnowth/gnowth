import { Preview } from '@storybook/react'

import { withAppEnvironment } from '../decorators/with-app-environment'
import { withReactQuery } from '../decorators/with-react-query'

export const decorators: Preview['decorators'] = [withAppEnvironment, withReactQuery]

export const parameters: Preview['parameters'] = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  locale: 'en',
  locales: {
    en: 'English',
    fr: 'Français',
  },
}
