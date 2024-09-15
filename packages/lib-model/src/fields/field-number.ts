import { objectDefaults } from '@gnowth/lib-utils'

import { Field, FieldConfigs } from './field'

export class FieldNumber extends Field<number> {
  constructor(configs: FieldConfigs<number> = {}) {
    const configsWithDefault = objectDefaults(configs, { type: 'number' })

    super(configsWithDefault)
  }
}
