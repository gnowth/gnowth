import { QueryCache, QueryClient } from '@tanstack/react-query'
import * as R from 'remeda'
import { Observable, Subject } from 'rxjs'

import { PlatformDependency, PlatformParameters } from '../core/platform'
import { ErrorData, ErrorModel } from './errors'
import { QueryInterfaceClientV1 } from './queries.types'

type Parameters = { client: QueryClient; errorOut$: Observable<ErrorData> } & PlatformParameters
export class QueryClientReactQueryV5 implements QueryInterfaceClientV1 {
  readonly client: QueryClient
  readonly errorOut$: Observable<ErrorData>
  readonly version = 'v1.0'

  constructor(parameters: Parameters) {
    this.client = parameters.client
    this.errorOut$ = parameters.errorOut$
  }

  static async construct(parameters: PlatformParameters): Promise<QueryClientReactQueryV5> {
    const errorOut$ = new Subject<ErrorData>()
    const errorModel = await parameters.platform.providerGet<ErrorModel>({
      name: PlatformDependency.errorModel,
    })
    const client = new QueryClient({
      defaultOptions: { queries: { refetchOnWindowFocus: false } },
      queryCache: new QueryCache({
        onError: (error) =>
          R.pipe(
            error,
            errorModel.fromErrorUnknown,
            R.forEach((err) => errorOut$.next(err)),
          ),
      }),
    })
    return new this({ ...parameters, client, errorOut$ })
  }
}
