import type { AppSetup } from '@gnowth/lib-application'
import type { i18n } from 'i18next'
import { appSetupCompose } from '@gnowth/lib-application'
import { ModelError, StreamErrors } from '@gnowth/logic-core'
import { initReactI18next } from 'react-i18next'
import { QueryCache, QueryClient } from 'react-query'
import { createInstance } from 'i18next'
import i18nBackend from 'i18next-http-backend'
import i18nLanguageDetector from 'i18next-browser-languagedetector'

const modelError = new ModelError()
const dependencies = {
  modelError,
  streamErrors: new StreamErrors({ dependencies: { modelError } }),
}

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
    .catch(dependencies.streamErrors.pushErrorUnknown)

  return { i18n }
}

type ConfigurationReactQuery = { queryClient: QueryClient }
const setupReactQuery: AppSetup<ConfigurationReactQuery> = () => ({
  queryClient: new QueryClient({
    defaultOptions: {
      queries: {
        keepPreviousData: true,
        refetchOnWindowFocus: false,
        suspense: true,
        useErrorBoundary: dependencies.modelError.isErrorQuery,
      },
    },
    queryCache: new QueryCache({ onError: dependencies.streamErrors.pushErrorUnknown }),
  }),
})

export const setup = appSetupCompose(setupI18n, setupReactQuery)
