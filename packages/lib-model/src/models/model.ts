import type { ObjectLike } from '@gnowth/lib-utils'
import { guardString, objectMapValues } from '@gnowth/lib-utils'

import type { DataName } from '../types'
import type { Field } from '../fields/field'
import { FieldModel } from '../fields/field-model'

type SchemaFromValue<Value> = {
  [Key in keyof Value]: Value[Key] extends Array<infer Item>
    ? Field<NonNullable<Item>>
    : Field<NonNullable<Value[Key]>>
}

// eslint-disable-next-line @typescript-eslint/ban-types
export class Model<Value extends ObjectLike = ObjectLike, Configs extends ObjectLike = ObjectLike> {
  // api?: QueryApi<Value>

  configs: Configs

  modelName = ''

  schema = {}

  constructor(configs: Configs) {
    this.configs = configs
  }

  getDefault(partial?: Partial<Value>): Value {
    return objectMapValues(
      this.schema,
      <Key extends keyof Value>(field: Field<Value[Key]>, key: Key) =>
        field.getDefault(partial?.[key]) as Value[Key],
    ) as unknown as Value
  }

  getField(name?: DataName): Field | undefined {
    const schema = this.schema as SchemaFromValue<Value>

    if (!name) return undefined

    if (guardString(name)) return schema[name as keyof Value]

    if (name.length === 0) return undefined

    if (name.length === 1) return schema[name.at(0) as keyof Value]

    return schema[name.at(0) as keyof Value].getField(name.slice(1))
  }

  toField(): FieldModel<Value> {
    return new FieldModel({ model: this })
  }

  // TODO
  valueIsValid(_value: Value | null): boolean {
    return !!_value
  }

  // TODO
  valueIsValidAsync(_value: Value | null): Promise<boolean> {
    return Promise.resolve(!!_value)
  }

  valueToId(value: Value | null): string {
    return this.valueToString(value)
  }

  // TODO
  valueToRoute(_value?: Value | null): string {
    return _value ? '' : ''
  }

  valueToString(_value: Value | null): string {
    return _value ? '' : ''
  }
}
