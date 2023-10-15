import type { ObjectLiteral } from '@gnowth/lib-utils'

import type { QueryConfigs, QueryParams } from './types'
import { QueryApi } from './query-api'
import { QueryResource } from './query-resource'

async function fetchGet<Response>(endpoint: string, params?: QueryParams): Promise<Response> {
  const response = await fetch(endpoint, params)

  // TODO: throw error depending on response status

  return (await response.json()) as Response
}

export class QueryApiRest<Value extends ObjectLiteral> extends QueryApi<Value> {
  async list(configs?: QueryConfigs<Value>): Promise<Value[]> {
    const response = await fetchGet<Record<string, unknown>>(this.getPath(configs))
    const serializer = configs?.serializer ?? this.serializer

    return serializer.toValueArray(response)
  }

  async retrieve(configs?: QueryConfigs<Value>): Promise<Value> {
    const response = await fetchGet<Record<string, unknown>>(this.getPath(configs))
    const serializer = configs?.serializer ?? this.serializer

    return serializer.toValue(response)
  }

  meta<Meta extends ObjectLiteral>(_configs?: QueryConfigs<Meta>): Promise<Meta> {
    return Promise.resolve((_configs ? {} : {}) as unknown as Meta)
  }

  resourceList(configs?: QueryConfigs<Value>): QueryResource<Value[]> {
    // TODO: add meta
    return new QueryResource(this.list(configs).then((data) => ({ data })))
  }

  resourceMeta<Meta extends ObjectLiteral>(configs?: QueryConfigs<Meta>): QueryResource<Meta> {
    return new QueryResource(this.meta<Meta>(configs).then((data) => ({ data })))
  }

  resourceRetrieve(configs?: QueryConfigs<Value>): QueryResource<Value> {
    return new QueryResource(this.retrieve(configs).then((data) => ({ data })))
  }
}
