import { AppRouterContext } from 'next/dist/shared/lib/app-router-context' // next 13 next 13 (using next/navigation)

import withReactQuery from '../decorators/with-react-query'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  layout: 'centered',
  locale: 'en',
  nextRouter: { Provider: AppRouterContext.Provider },

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
