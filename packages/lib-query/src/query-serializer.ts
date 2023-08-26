import type { QueryApi, QuerySerializer as IQuerySerializer } from '@gnowth/lib-types'
import { pluralize } from 'inflected'

interface Configs<Value> {
  api: QueryApi<Value>
}

// TODO: allow rename of field
// TODO: transform base on type
// TODO: allow type override?
// TODO: allow specific field override?
// TODO: allow extending class
// TODO: allow querying missing data for model field. e.g if we only have the id, but we want it flat or nested
class QuerySerializer<Value> implements IQuerySerializer<Value> {
  api: QueryApi<Value>

  // static chain<Data>(model: Model): void {
  //   const chain = utils.flow<Data[], Data, Data, Data, Data>(
  //     utils.omitBy(utils.isUndefined),
  //     utils.pickBy((_value, key: string) => key in model.schema),
  //     utils.mapValues((value: unknown, key: keyof Value): unknown => model.getField(key)),
  //     utils.mapValues((field: Field) => field.type),
  //     utils.defaults(model.getDefault()),
  //   );
  // }

  constructor(configs: Configs<Value>) {
    this.api = configs.api
  }

  fromValue(value: undefined): null
  fromValue(value: Value): Record<string, unknown>
  fromValue(value?: Value): Record<string, unknown> | null {
    if (!value) return null

    return { [this.api.model.modelName]: value }

    // const chain = utils.flow<Data[], Data, Data, Data>(
    //   utils.omitBy(utils.isUndefined),
    //   utils.pickBy((_value: unknown, key: string) => key in this.api.model.schema),
    //   utils.mapValues((val, key: keyof Value) => this.api.model.schema[key].serialize(val)),
    // );

    // return chain(value as Data);
  }

  fromValueArray(value?: Value[]): Record<string, unknown> {
    return {
      [pluralize(this.api.model.modelName)]: value ? value.map((item) => this.fromValue(item)) : [],
    }
  }

  toValue(data: undefined): null
  toValue(data: Record<string, unknown>): Value
  toValue(data?: Record<string, unknown>): Value | null {
    if (!data) return null

    // const dataItem = data[this.api.model.modelName];

    return data[this.api.model.modelName] as Value
    // const chain = utils.flow<Data[], Data, Data, Data, Data>(
    //   utils.omitBy(utils.isUndefined),
    //   utils.pickBy((_value, key: string) => key in this.api.model.schema),
    //   utils.mapValues((value: unknown, key: keyof Value): unknown =>
    //     this.api.model.schema[key].deserialize(value),
    //   ),
    //   utils.defaults(this.api.model.getDefault()),
    // );

    // return chain(data) as Value;
  }

  // TODO need more robust check or types
  toValueArray(data?: Record<string, unknown>): Value[] {
    if (!data) return []

    const dataItems = (data[pluralize(this.api.model.modelName)] || []) as Array<unknown>

    return dataItems.map((item) => this.toValue({ ...data, [this.api.model.modelName]: item }))
  }
}

export default QuerySerializer
