import { objectDefaults } from '@gnowth/lib-utils'

import type { ConfigsAny } from './field-any'
import { FieldAny } from './field-any'

export class FieldDate extends FieldAny<Date> {
  constructor(configs: ConfigsAny<Date> = {}) {
    const configsWithDefault = objectDefaults(configs, { type: 'date' })

    super(configsWithDefault)
  }
}
