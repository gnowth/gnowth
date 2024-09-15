import { objectDefaults } from '@gnowth/lib-utils'

import { Field, FieldConfigs } from './field'

export class FieldBoolean extends Field<boolean> {
  constructor(configs: FieldConfigs<boolean> = {}) {
    const configsWithDefault = objectDefaults(configs, { type: 'boolean' })

    super(configsWithDefault)
  }
}
