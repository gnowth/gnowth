import type { ObjectLike } from '@gnowth/lib-utils'
import { objectDefaults } from '@gnowth/lib-utils'

import type { DataName } from '../types'
import type { Model } from '../models/model'
import type { FieldConfigs } from './field'
import { Field } from './field'

type Nested = 'id' | 'flat' | 'nested'

interface ConfigsModel<Value extends ObjectLike> extends FieldConfigs<Value> {
  model: Model<Value>
  nested?: Nested
}

export class FieldModel<Value extends ObjectLike> extends Field {
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

  valueToString(value: Value | null): string {
    return this.model.valueToString(value)
  }
}
