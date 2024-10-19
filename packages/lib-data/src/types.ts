import { Field } from '@gnowth/lib-model'
import { ObjectLiteral } from '@gnowth/lib-utils'

export type DataError = Error

export type DataOptionMap = Record<string, Promise<unknown[]>>

export type DataName = string | string[]

export type DataValue = ObjectLiteral

// TODO: errors to be both promise and actual errors?
export type PropsDataReadonly<Value = unknown> = {
  awaiting?: boolean
  errors?: DataError[] | Promise<DataError[]>
  field?: Field
  id?: string
  value?: Value
}

// add resources in PropsData?
// TODO: fix onChange value may not match value if name is an array
export type PropsData<Value = unknown> = {
  disabled?: boolean
  name?: DataName
  onCancel?(value: Value, name?: DataName): Promise<void> | void
  onChange?(value: Value, name?: DataName): Promise<void> | void
  onReset?(value: Value, name?: DataName): Promise<void> | void
  onSubmit?(value: Value, name?: DataName): Promise<void> | void
  options?: Promise<Value[]> | Value[]
} & PropsDataReadonly<Value>

export type WithConnect = {
  connect<Value>(name?: DataName): PropsData<Value>
}

export type TokenMode = 'controlled' | 'shadow' | 'uncontrolled'
