import { objectDefaults } from '@gnowth/lib-utils'

import type { FieldConfigs } from './field'

import { Field } from './field'

export class FieldDate extends Field<Date> {
  constructor(configs: FieldConfigs<Date> = {}) {
    const configsWithDefault = objectDefaults(configs, { type: 'date' })

    super(configsWithDefault)
  }
}
