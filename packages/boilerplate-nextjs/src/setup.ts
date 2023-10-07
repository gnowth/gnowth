import { ModelError } from '@gnowth/core-app'
import { initReactI18next } from 'react-i18next'
import { QueryCache, QueryClient } from 'react-query'
import { createInstance } from 'i18next'
import i18nBackend from 'i18next-http-backend'
import i18nLanguageDetector from 'i18next-browser-languagedetector'

import { streamErrors } from './services/stream-errors'
import { makeServer } from './services/make-server'

function setupI18n() {
  const i18n = createInstance()

  i18n
    .use(i18nBackend) // load translation using http. docs: https://github.com/i18next/i18next-http-backend
    .use(i18nLanguageDetector) // detect user language. docs: https://github.com/i18next/i18next-browser-languageDetector
    .use(initReactI18next)
    .init({
      debug: false,
      fallbackLng: 'en',
    }) // for all options docs: https://www.i18next.com/overview/configuration-options
    .catch(streamErrors.pushErrorUnknown)

  return i18n
}

function setupMockServer() {
  const server = makeServer({ environment: process.env.NODE_ENV ?? 'development' })

  // Note: uncomment code below to remove miragejs in production mode
  // let server
  // if (process.env.NODE_ENV === 'development') {
  //   server = makeServer({ environment: process.env.NODE_ENV ?? 'development' })
  // }

  return server
}

function setupReactQuery() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // DEBT: disable query server side. find better solution
        enabled: typeof window !== 'undefined',
        keepPreviousData: true,
        refetchOnWindowFocus: false,
        suspense: true,
        useErrorBoundary: ModelError.isErrorQuery,
      },
    },
    queryCache: new QueryCache({ onError: streamErrors.pushErrorUnknown }),
  })
}

export function setup() {
  return {
    i18n: setupI18n(),
    mockServer: setupMockServer(),
    queryClient: setupReactQuery(),
  }
}
