import { ObjectLiteral } from '@gnowth/lib-utils'
import { pluralize } from 'inflected'

import { QueryApi } from './query-api'

type Configs<Value extends ObjectLiteral> = {
  api: QueryApi<Value>
}

export class QuerySerializer<Value extends ObjectLiteral> {
  api: QueryApi<Value>

  constructor(configs: Configs<Value>) {
    this.api = configs.api
  }

  fromValue(value: undefined): null
  fromValue(value: Value): Record<string, unknown>
  fromValue(value?: Value): null | Record<string, unknown> {
    if (!value) return null

    return { [this.api.model.modelName]: value }
  }

  fromValueArray(value?: Value[]): Record<string, unknown> {
    return {
      [pluralize(this.api.model.modelName)]: value ? value.map((item) => this.fromValue(item)) : [],
    }
  }

  toValue(data: undefined): null
  toValue(data: Record<string, unknown>): Value
  toValue(data?: Record<string, unknown>): null | Value {
    if (!data) return null

    return data[this.api.model.modelName] as Value
  }

  toValueArray(data?: Record<string, unknown>): Value[] {
    if (!data) return []

    const dataItems = (data[pluralize(this.api.model.modelName)] || []) as unknown[]

    return dataItems.map((item) => this.toValue({ ...data, [this.api.model.modelName]: item }))
  }
}
