import { ObjectLiteral } from '@gnowth/lib-utils'

import { QuerySerializer } from './query-serializer'

export type QueryConfigs<Value extends ObjectLiteral> = {
  action?: string
  id?: string
  method?: string
  params?: QueryParams
  serializer?: QuerySerializer<Value>
}

export type QueryParams = Record<string, string>
