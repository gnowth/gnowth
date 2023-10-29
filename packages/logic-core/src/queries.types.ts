import type { QueryFunctionContext } from 'react-query'

type FetchMeta = {
  count: number
  pages: number
}
type KeyDetail = [{ entity: string; id: string; scope: string }]
type KeyList<Params> = [{ entity: string; params?: Params; scope: string }]

export type QueryDetail<Item = unknown> = { data: Item }
export type QueryList<Item = unknown> = { data: Item[]; meta: FetchMeta }
export type QueryParametersDetail = QueryFunctionContext<KeyDetail>
export type QueryParametersList<Params> = QueryFunctionContext<KeyList<Params>>
export type QueryKeyDetail = (id: string) => KeyDetail
export type QueryKeyList<Params> = (params?: Params) => KeyList<Params>
