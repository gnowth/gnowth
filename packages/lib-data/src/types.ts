import type { Field } from '@gnowth/lib-model'

export type DataError = Error

export type DataOptionMap = Record<string, Promise<unknown[]>>

export type DataName = string | Array<string>

// eslint-disable-next-line @typescript-eslint/ban-types
export type DataValue = object

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
  errors?: Promise<DataError[]> | DataError[]
  field?: Field
  id?: string
  value?: Value
}

// add resources in PropsData?
export interface PropsData<Value = unknown> extends PropsDataReadonly<Value> {
  disabled?: boolean
  name?: DataName
  options?: Promise<Value[]> | Value[]
  onCancel?(value: Value, name?: DataName): void | Promise<void>
  onChange?(value: Value, name?: DataName): void | Promise<void>
  onReset?(value: Value, name?: DataName): void | Promise<void>
  onSubmit?(value: Value, name?: DataName): void | Promise<void>
}

export interface WithConnect {
  connect<Value>(name?: DataName): PropsData<Value>
}

export type TokenMode = 'controlled' | 'shadow' | 'uncontrolled'
