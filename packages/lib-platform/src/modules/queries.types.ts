import { ObjectLiteral } from '@gnowth/lib-utils'
import { QueryClient, QueryFunctionContext } from '@tanstack/react-query'
import { Observable } from 'rxjs'

import { ErrorData } from './errors'

export interface QueryInterfaceClientV1 {
  readonly client: QueryClient
  readonly errorOut$: Observable<ErrorData>
  readonly version: 'v1.0'
}

export type QueryKeyDetail = [{ entity: 'detail'; id: string; scope: string }]
export type QueryParametersDetail = QueryFunctionContext<QueryKeyDetail>
export type QueryDetail<TItem> = { data: TItem }
export type QueryFnOptionsDetail<TItem> = (options: {
  id: string
  queryFn?: (parameters: QueryParametersDetail) => Promise<QueryDetail<TItem>>
  queryKey?: QueryKeyDetail
}) => {
  queryFn: (parameters: QueryParametersDetail) => Promise<QueryDetail<TItem>>
  queryKey: QueryKeyDetail
}

type FetchMeta = { count: number; pages: number }
export type QueryKeyList<Params> = [{ entity: 'list'; params?: Params; scope: string }]
export type QueryList<TItem> = { data: TItem[]; meta: FetchMeta }
export type QueryParametersList<TParams> = QueryFunctionContext<QueryKeyList<TParams>>
export type QueryFnOptionsList<TItem, TParams = ObjectLiteral> = (options?: {
  params?: TParams
  queryFn?: (parameters: QueryParametersList<TParams>) => Promise<QueryList<TItem>>
  queryKey?: QueryKeyList<TParams>
}) => {
  queryFn: (parameters: QueryParametersList<TParams>) => Promise<QueryList<TItem>>
  queryKey: QueryKeyList<TParams>
}

export type QueryFnOptionsSave<TItem> = (options?: {
  mutationFn?: (item: TItem) => Promise<QueryDetail<TItem>>
  onSuccess?: (detail: QueryDetail<TItem>) => Promise<void>
}) => {
  mutationFn: (item: TItem) => Promise<QueryDetail<TItem>>
  onSuccess?: (detail: QueryDetail<TItem>) => Promise<void>
}
