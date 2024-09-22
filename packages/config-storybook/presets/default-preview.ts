import { Preview } from '@storybook/react'

import { withApplicationProvider } from '../decorators/with-application-provider'

export const decorators: Preview['decorators'] = [withApplicationProvider]

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
