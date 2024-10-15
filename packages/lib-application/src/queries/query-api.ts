import { Model } from '@gnowth/lib-model'
import { ObjectLiteral } from '@gnowth/lib-utils'

import { QueryResource } from './query-resource'
import { QuerySerializer } from './query-serializer'
import { QueryConfigs } from './types'

type QueryConfigsApi<Value extends ObjectLiteral> = {
  endpoint: string
  model: Model<Value>
  serializer?: QuerySerializer<Value>
}

// TODO: queryApi should use field instead of model
export abstract class QueryApi<Value extends ObjectLiteral> {
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

  abstract meta<Meta extends ObjectLiteral>(configs?: QueryConfigs<Meta>): Promise<Meta>

  abstract resourceList(configs?: QueryConfigs<Value>): QueryResource<Value[]>

  abstract resourceMeta<Meta extends ObjectLiteral>(configs?: QueryConfigs<Meta>): QueryResource<Meta>

  abstract resourceRetrieve(configs?: QueryConfigs<Value>): QueryResource<Value>

  abstract retrieve(configs?: QueryConfigs<Value>): Promise<Value>
}
