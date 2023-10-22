import type { AppSetup } from '@gnowth/lib-application'
import type { i18n } from 'i18next'
import { initReactI18next } from 'react-i18next'
import { QueryCache, QueryClient } from 'react-query'
import { createInstance } from 'i18next'
import { appSetupCompose } from '@gnowth/lib-application'
import i18nBackend from 'i18next-http-backend'
import i18nLanguageDetector from 'i18next-browser-languagedetector'

import { ModelError } from './models/model-error'
import { streamErrors } from './services/stream-errors'
// import makeServer from './services/make-server'

type ConfigurationI18n = { i18n: i18n }
const setupI18n: AppSetup<ConfigurationI18n> = () => {
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

  return { i18n }
}

type ConfigurationMockServer = { mockServer: undefined }
const setupMockServer: AppSetup<ConfigurationMockServer> = () => {
  // const server = makeServer({ environment: process.env.NODE_ENV ?? 'development' })
  // Note: uncomment code below to remove miragejs in production mode
  // let server
  // if (process.env.NODE_ENV === 'development') {
  //   server = makeServer({ environment: process.env.NODE_ENV ?? 'development' })
  // }
  // return server
  return { mockServer: undefined }
}

type ConfigurationReactQuery = { queryClient: QueryClient }
const setupReactQuery: AppSetup<ConfigurationReactQuery> = () => ({
  queryClient: new QueryClient({
    defaultOptions: {
      queries: {
        keepPreviousData: true,
        refetchOnWindowFocus: false,
        suspense: true,
        useErrorBoundary: ModelError.isErrorQuery,
      },
    },
    queryCache: new QueryCache({ onError: streamErrors.pushErrorUnknown }),
  }),
})

export const setup = appSetupCompose(setupI18n, setupMockServer, setupReactQuery)
