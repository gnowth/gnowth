import { ObjectLiteral } from '@gnowth/lib-utils'

import { QueryApi } from './query-api'
import { QueryResource } from './query-resource'
import { QueryConfigs, QueryParams } from './types'

export class QueryApiRest<Value extends ObjectLiteral> extends QueryApi<Value> {
  async list(configs?: QueryConfigs<Value>): Promise<Value[]> {
    const response = await fetchGet<Record<string, unknown>>(this.getPath(configs))
    const serializer = configs?.serializer ?? this.serializer

    return serializer.toValueArray(response)
  }

  meta<Meta extends ObjectLiteral>(_configs?: QueryConfigs<Meta>): Promise<Meta> {
    return Promise.resolve({} as unknown as Meta)
  }

  resourceList(configs?: QueryConfigs<Value>): QueryResource<Value[]> {
    return new QueryResource(this.list(configs).then((data) => ({ data })))
  }

  resourceMeta<Meta extends ObjectLiteral>(configs?: QueryConfigs<Meta>): QueryResource<Meta> {
    return new QueryResource(this.meta<Meta>(configs).then((data) => ({ data })))
  }

  resourceRetrieve(configs?: QueryConfigs<Value>): QueryResource<Value> {
    return new QueryResource(this.retrieve(configs).then((data) => ({ data })))
  }

  async retrieve(configs?: QueryConfigs<Value>): Promise<Value> {
    const response = await fetchGet<Record<string, unknown>>(this.getPath(configs))
    const serializer = configs?.serializer ?? this.serializer

    return serializer.toValue(response)
  }
}

async function fetchGet<Response>(endpoint: string, params?: QueryParams): Promise<Response> {
  const response = await fetch(endpoint, params)

  return (await response.json()) as Response
}
