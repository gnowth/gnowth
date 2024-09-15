import { objectDefaults } from '@gnowth/lib-utils'

import { Field, FieldConfigs } from './field'

export class FieldDate extends Field<Date> {
  constructor(configs: FieldConfigs<Date> = {}) {
    const configsWithDefault = objectDefaults(configs, { type: 'date' })

    super(configsWithDefault)
  }
}
