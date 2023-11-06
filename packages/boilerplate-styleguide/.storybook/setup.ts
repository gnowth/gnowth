import type { AppSetup } from '@gnowth/lib-application'
import type { i18n } from 'i18next'
import { appSetupCompose } from '@gnowth/lib-application'
import { ErrorModel, ErrorStream } from '@gnowth/logic-core'
import { initReactI18next } from 'react-i18next'
import { QueryCache, QueryClient } from 'react-query'
import { createInstance } from 'i18next'
import i18nBackend from 'i18next-http-backend'
import i18nLanguageDetector from 'i18next-browser-languagedetector'

const dependencies = {
  errorModel: new ErrorModel(),
  errorStream: new ErrorStream(),
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
    .catch(dependencies.errorStream.pushErrorUnknown)

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
        useErrorBoundary: dependencies.errorModel.isErrorQuery,
      },
    },
    queryCache: new QueryCache({ onError: dependencies.errorStream.pushErrorUnknown }),
  }),
})

export const setup = appSetupCompose(setupI18n, setupReactQuery)
