import { objectDefaults } from '@gnowth/lib-utils'

import { Model } from '../models/model'
import { DataName } from '../types'
import { Field, FieldConfigs } from './field'

type ConfigsModel<Value> = FieldConfigs<Value> & {
  model: Model<Value>
  nested?: Nested
}

type Nested = 'flat' | 'id' | 'nested'

export class FieldModel<Value> extends Field {
  model: Model<Value>
  nested: Nested

  constructor(configs: ConfigsModel<Value>) {
    const configsWithDefault = objectDefaults(configs, { type: 'model' })

    super(configsWithDefault)

    this.model = configs.model
    this.nested = configs.nested ?? 'flat'
  }

  getField(name?: DataName): Field | undefined {
    if (!name) return this

    if (Array.isArray(name) && name.length === 0) return this

    return this.model.getField(name)
  }

  valueToString(value: null | Value): string {
    return this.model.valueToString(value)
  }
}
