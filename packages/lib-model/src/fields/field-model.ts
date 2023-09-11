import type { DataName, Field, Model } from '@gnowth/lib-types'
import { objectDefaults } from '@gnowth/lib-utils'

import type { ConfigsAny } from './field-any'
import { FieldAny } from './field-any'

type Nested = 'id' | 'flat' | 'nested'

interface ConfigsModel<Value> extends ConfigsAny<Value> {
  model: Model<Value>
  nested?: Nested
}

export class FieldModel<Value> extends FieldAny<Value> {
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
