import type { AppSetup } from '@gnowth/lib-react'
import { appSetupCompose, ErrorModel, ErrorStream } from '@gnowth/lib-react'
import { QueryCache, QueryClient } from '@tanstack/react-query'

const dependencies = {
  errorModel: new ErrorModel(),
  errorStream: new ErrorStream(),
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

export const setup = appSetupCompose(setupReactQuery)
