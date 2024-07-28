import type { ObjectLiteral } from '@gnowth/lib-utils'

import { guardString, objectMapValues } from '@gnowth/lib-utils'

import type { Field } from '../fields/field'
import type { DataName } from '../types'

import { FieldModel } from '../fields/field-model'

type SchemaFromValue<Value> = {
  [Key in keyof Value]: Value[Key] extends Array<infer Item>
    ? Field<NonNullable<Item>>
    : Field<NonNullable<Value[Key]>>
}

interface ParametersModel {
  dependencies?: ObjectLiteral
}

export class Model<Value = ObjectLiteral, Parameters extends ParametersModel = ParametersModel> {
  // api?: QueryApi<Value>

  protected dependencies: Parameters['dependencies']
  modelName = ''

  protected parameters: Parameters

  schema = {}

  constructor(parameters: Parameters) {
    this.parameters = parameters
    this.dependencies = parameters.dependencies ?? {}
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  valueToRoute(_value?: Value | null): string {
    return ''
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  valueToString(_value: Value | null): string {
    return ''
  }
}
