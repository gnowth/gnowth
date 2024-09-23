import * as R from 'remeda'

import { Model } from '../models/model'
import { DataName } from '../types'
import { Field, FieldConfigs } from './field'

type Nested = 'flat' | 'id' | 'nested'

interface ConfigsModel<Value> extends FieldConfigs<Value> {
  model: Model<Value>
  nested?: Nested
}

export class FieldModel<Value> extends Field {
  model: Model<Value>
  nested: Nested

  constructor(configs: ConfigsModel<Value>) {
    const configsWithDefault = R.merge({ type: 'model' }, configs)

    super(configsWithDefault)

    this.model = configs.model
    this.nested = configs.nested ?? 'flat'
  }

  getField(name?: DataName): Field | undefined {
    if (!name) return this

    if (Array.isArray(name) && name.length === 0) return this

    return this.model.getField(name)
  }

  valueToString(value: Value | null): string {
    return this.model.valueToString(value)
  }
}
