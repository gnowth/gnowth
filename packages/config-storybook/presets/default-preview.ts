import withReactQuery from '../decorators/with-react-query'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  layout: 'centered',
  locale: 'en',

  locales: {
    en: 'English',
    fr: 'Français',
  },

  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

export const decorators = [withReactQuery]
