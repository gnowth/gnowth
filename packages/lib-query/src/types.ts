import type { ObjectLike } from '@gnowth/lib-utils'
import type { QuerySerializer } from './query-serializer'

export type QueryParams = Record<string, string>

export interface QueryConfigs<Value extends ObjectLike> {
  action?: string
  id?: string
  method?: string
  params?: QueryParams
  serializer?: QuerySerializer<Value>
}
