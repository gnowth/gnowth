import { QueryClient } from '@tanstack/react-query'
import { Observable } from 'rxjs'

import { ErrorData } from './errors'

export interface QueryInterfaceClientV1 {
  readonly client: QueryClient
  readonly errorOut$: Observable<ErrorData>
  readonly version: 'v1.0'
}
