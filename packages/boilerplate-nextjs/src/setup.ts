import type { AppSetup } from '@gnowth/lib-application'
import type { i18n } from 'i18next'

import { appSetupCompose } from '@gnowth/lib-application'
import { QueryCache, QueryClient } from '@tanstack/react-query'
import { createInstance } from 'i18next'
import i18nLanguageDetector from 'i18next-browser-languagedetector'
import i18nBackend from 'i18next-http-backend'

import { dependencies } from './dependencies'
import { makeServer } from './services/make-server'

type ConfigurationI18n = { i18n: i18n }
const setupI18n: AppSetup<ConfigurationI18n> = () => {
  const i18n = createInstance()

  i18n
    .use(i18nBackend) // load translation using http. docs: https://github.com/i18next/i18next-http-backend
    .use(i18nLanguageDetector) // detect user language. docs: https://github.com/i18next/i18next-browser-languageDetector
    .init({
      debug: false,
      fallbackLng: 'en',
    }) // for all options docs: https://www.i18next.com/overview/configuration-options
    .catch(dependencies.errorStream.pushErrorUnknown)

  return { i18n }
}

type ConfigurationMockServer = { mockServer: ReturnType<typeof makeServer> }
const setupMockServer: AppSetup<ConfigurationMockServer> = () => {
  const mockServer = makeServer({ environment: process.env.NODE_ENV ?? 'development' })

  // Note: uncomment code below to remove miragejs in production mode
  // let server
  // if (process.env.NODE_ENV === 'development') {
  //   server = makeServer({ environment: process.env.NODE_ENV ?? 'development' })
  // }

  return { mockServer }
}

type ConfigurationReactQuery = { queryClient: QueryClient }
const setupReactQuery: AppSetup<ConfigurationReactQuery> = () => ({
  queryClient: new QueryClient({
    defaultOptions: {
      queries: {
        // DEBT: disable query server side. find better solution
        enabled: typeof window !== 'undefined',
        refetchOnWindowFocus: false,
      },
    },
    queryCache: new QueryCache({ onError: dependencies.errorStream.pushErrorUnknown }),
  }),
})

export const setup = appSetupCompose(setupI18n, setupMockServer, setupReactQuery)
