import type { Field } from '@gnowth/lib-model'
import type { ObjectLiteral } from '@gnowth/lib-utils'

export type DataError = Error

export type DataOptionMap = Record<string, Promise<unknown[]>>

export type DataName = Array<string> | string

export type DataValue = ObjectLiteral

// TODO: Remove
// export interface PropsData<Value = DataValue, OptionMap = DataOptionMap> {
//   defaultValue?: Value;
//   disabled?: boolean;
//   errors?: Promise<DataError[]>;
//   // field?: Field;
//   index?: number | null;
//   name?: string;
//   onChange?: (event: DataEvent<Value>) => void;
//   onSubmit?: (event: DataEvent<Value>) => void;
//   optionMap?: OptionMap;
//   shadow?: boolean;
//   uncontrolled?: string;
//   value?: Value;
//   valueInitial?: Value;
// }

// TODO: errors to be both promise and actual errors?
export interface PropsDataReadonly<Value = unknown> {
  awaiting?: boolean
  errors?: DataError[] | Promise<DataError[]>
  field?: Field
  id?: string
  value?: Value
}

// add resources in PropsData?
export interface PropsData<Value = unknown> extends PropsDataReadonly<Value> {
  disabled?: boolean
  name?: DataName
  onCancel?(value: Value, name?: DataName): Promise<void> | void
  onChange?(value: Value, name?: DataName): Promise<void> | void
  onReset?(value: Value, name?: DataName): Promise<void> | void
  onSubmit?(value: Value, name?: DataName): Promise<void> | void
  options?: Promise<Value[]> | Value[]
}

export interface WithConnect {
  connect<Value>(name?: DataName): PropsData<Value>
}

export type TokenMode = 'controlled' | 'shadow' | 'uncontrolled'
