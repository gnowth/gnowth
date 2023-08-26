import type {
  Model,
  QueryApi as IQueryApi,
  QueryConfigs,
  QueryResource,
  QuerySerializer as IQuerySerializer,
} from '@gnowth/lib-types'

import QuerySerializer from './query-serializer'

interface QueryConfigsApi<Value> {
  endpoint: string
  model: Model<Value>
  serializer?: IQuerySerializer<Value>
}

abstract class QueryApi<Value> implements IQueryApi<Value> {
  endpoint: string

  model: Model<Value>

  serializer: QuerySerializer<Value>

  constructor(configs: QueryConfigsApi<Value>) {
    this.endpoint = configs.endpoint
    this.model = configs.model
    this.serializer = configs.serializer ?? new QuerySerializer({ api: this })
  }

  getPath(configs?: QueryConfigs<Value>): string {
    if (!configs) return this.endpoint

    const pathAction = configs?.action === undefined ? '' : `${configs.action}/`
    const pathId = configs?.id === undefined ? '' : `${configs.id}/`

    return `${this.endpoint}${pathId}${pathAction}`
  }

  abstract list(configs?: QueryConfigs<Value>): Promise<Value[]>

  abstract meta<Meta>(configs?: QueryConfigs<Meta>): Promise<Meta>

  abstract retrieve(configs?: QueryConfigs<Value>): Promise<Value>

  abstract resourceList(configs?: QueryConfigs<Value>): QueryResource<Value[]>

  abstract resourceMeta<Meta>(configs?: QueryConfigs<Meta>): QueryResource<Meta>

  abstract resourceRetrieve(configs?: QueryConfigs<Value>): QueryResource<Value>
}

export default QueryApi
