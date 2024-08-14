import type { Preview } from '@storybook/react'

import { withReactQuery } from '../decorators/with-react-query'

export const decorators: Preview['decorators'] = [withReactQuery]

export const parameters: Preview['parameters'] = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  layout: 'centered',
  locale: 'en',
  locales: {
    en: 'English',
    fr: 'Français',
  },
}
