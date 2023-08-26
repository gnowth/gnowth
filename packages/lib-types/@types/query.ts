import { Model } from './model'

export type QueryParams = Record<string, string>

export interface QueryResource<Value = unknown> {
  read(): Value
}

export interface QuerySerializer<Value> {
  api: QueryApi<Value>
  fromValue(value: undefined): null
  fromValue(value: Value): Record<string, unknown>
  fromValue(value?: Value): Record<string, unknown> | null
  fromValueArray(value?: Value[]): Record<string, unknown>
  toValue(data: undefined): null
  toValue(data: Record<string, unknown>): Value
  toValue(data?: Record<string, unknown>): Value | null
  toValueArray(data?: Record<string, unknown>): Value[]
}

export interface QueryConfigs<Value> {
  action?: string
  id?: string
  method?: string
  params?: QueryParams
  serializer?: QuerySerializer<Value>
}

export interface QueryApi<Value> {
  model: Model<Value>
  retrieve(configs?: QueryConfigs<Value>): Promise<Value>
  list(configs?: QueryConfigs<Value>): Promise<Value[]>
  meta<Meta>(configs?: QueryConfigs<Meta>): Promise<Meta>
  resourceRetrieve(configs?: QueryConfigs<Value>): QueryResource<Value>
  resourceList(configs?: QueryConfigs<Value>): QueryResource<Value[]>
  resourceMeta<Meta>(configs?: QueryConfigs<Meta>): QueryResource<Meta>

  // create() {}
  // update() {}
  // destroy() {}
  // updatePartial() {}
  // delete() {}
}
