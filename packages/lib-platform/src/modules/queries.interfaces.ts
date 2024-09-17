import { QueryClient } from '@tanstack/react-query'

interface QueryInterfaceClient {}

export class QueryInterfaceClientV5 implements QueryInterfaceClient {
  #queryClient: QueryClient

  static async construct() {
    const client = new QueryClient({
      defaultOptions: {
        queries: {
          // DEBT: disable query server side. find better solution
          enabled: typeof window !== 'undefined',
          refetchOnWindowFocus: false,
        },
      },
      queryCache: new QueryCache({ onError: dependencies.errorStream.pushErrorUnknown }),
    })
  }
}
