import type { DataName } from '../types'

// TODO: check if there should be a nullable config
export interface FieldConfigs<Value = unknown> {
  blank?: boolean
  default?: Value | null
  many?: boolean
  options?: Value[] | null
  type?: string
}

export class Field<Value = unknown> {
  blank: boolean
  default: Value | null
  many?: boolean
  options: Value[] | null
  type: string

  constructor(configs: FieldConfigs<Value> = {}) {
    this.blank = configs.blank || false
    this.default = configs.default ?? null
    this.many = configs.many
    this.options = configs.options ?? null
    this.type = configs.type || 'any'
  }

  // TODO: what to return as default if many is on. need proper documentation as there is potential misunderstanding
  getDefault(_partial?: Partial<Value>): Value[] | Value | null {
    if (this.many) return []

    return _partial ? this.default : this.default
  }

  getField(name?: DataName): Field<Value> | undefined {
    return name ? undefined : this
  }

  // TODO implement promises
  getOptions(): null | Value[] | Promise<Value[]> {
    return this.options
  }

  // TODO
  valueIsBlank(value: Value): boolean {
    return value === undefined
  }

  // TODO
  valueIsValid(_value: Value | null): boolean {
    return !!_value
  }

  // TODO
  valueIsValidAsync(_value: Value | null): Promise<boolean> {
    return Promise.resolve(!!_value)
  }

  valueToParam(value: Value): string {
    return this.valueToString(value)
  }

  valueToString(value: Value): string {
    return value?.toString ? value?.toString() : JSON.stringify(value)
  }
}
