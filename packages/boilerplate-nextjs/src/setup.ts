import { AppSetup, appSetupCompose } from '@gnowth/lib-application'
import { QueryCache, QueryClient } from '@tanstack/react-query'

import { dependencies } from './dependencies'
import { makeServer } from './services/make-server'

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

export const setup = appSetupCompose(setupMockServer, setupReactQuery)
