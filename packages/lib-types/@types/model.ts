import type { DataName } from './data'
import type { QueryApi } from './query'

// TODO check if the default to the generics is needed or is it better to remove
export interface Field<Value = unknown> {
  type: string
  getDefault(partial?: Partial<Value>): Value[] | Value | null
  getField(name?: DataName): Field | undefined
}

export type SchemaFromValue<Value> = {
  [Key in keyof Value]: Value[Key] extends Array<infer Item>
    ? Field<NonNullable<Item>>
    : Field<NonNullable<Value[Key]>>
}

// TODO check if the default to the generics is needed or is it better to remove
export interface Model<Value = unknown> {
  api?: QueryApi<Value>
  modelName: string
  getDefault(partial?: Partial<Value>): Value
  getField(name: DataName): Field | undefined
  toField(): Field<Value>
  valueToId(value: Value | null): string
  valueToRoute(value?: Value | null): string
  valueToString(value: Value | null): string
}
