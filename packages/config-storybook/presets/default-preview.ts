import { withReactQuery } from '../decorators/with-react-query'

export const parameters = {
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

export const decorators = [withReactQuery]
