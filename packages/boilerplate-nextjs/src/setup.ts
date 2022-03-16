import type { AxiosError } from 'axios'
import { initReactI18next } from 'react-i18next'
import { QueryCache, QueryClient } from 'react-query'
import i18n from 'i18next'
import i18nBackend from 'i18next-http-backend'
import i18nLanguageDetector from 'i18next-browser-languagedetector'

import { streamErrors } from './views/system-toast-errors'
import makeServer from './services/make-server'

function setupI18n() {
  i18n
    .use(i18nBackend) // load translation using http. docs: https://github.com/i18next/i18next-http-backend
    .use(i18nLanguageDetector) // detect user language. docs: https://github.com/i18next/i18next-browser-languageDetector
    .use(initReactI18next)
    .init({
      debug: false,
      fallbackLng: 'en',
    }) // for all options docs: https://www.i18next.com/overview/configuration-options
    .catch(streamErrors.actions.addError)

  return i18n
}

function setupMockServer() {
  let server
  if ((process.env.NEXT_PUBLIC_ENV ?? process.env.NODE_ENV) === 'development') {
    server = makeServer({ environment: process.env.NODE_ENV ?? 'development' })
  }

  return server
}

function setupReactQuery() {
  return new QueryClient({
    queryCache: new QueryCache({
      onError: (error: unknown) => streamErrors.actions.addError(error as Error),
    }),
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        useErrorBoundary: (error: unknown) => ((error as AxiosError).response?.status ?? 0) >= 500,
      },
    },
  })
}

function setup() {
  return {
    i18n: setupI18n(),
    queryClient: setupReactQuery(),
    mockServer: setupMockServer(),
  }
}

export default setup
