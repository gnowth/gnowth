import { objectDefaults } from '@gnowth/lib-utils'

import type { FieldConfigs } from './field'
import { Field } from './field'

export class FieldNumber extends Field<number> {
  constructor(configs: FieldConfigs<number> = {}) {
    const configsWithDefault = objectDefaults(configs, { type: 'number' })

    super(configsWithDefault)
  }
}
