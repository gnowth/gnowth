import { objectDefaults } from '@gnowth/lib-utils'

import type { FieldConfigs } from './field'
import { Field } from './field'

export class FieldBoolean extends Field<boolean> {
  constructor(configs: FieldConfigs<boolean> = {}) {
    const configsWithDefault = objectDefaults(configs, { type: 'boolean' })

    super(configsWithDefault)
  }
}
