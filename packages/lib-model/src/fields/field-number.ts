import { objectDefaults } from '@gnowth/lib-utils'

import type { ConfigsAny } from './field-any'
import FieldAny from './field-any'

class FieldNumber extends FieldAny<number> {
  constructor(configs: ConfigsAny<number> = {}) {
    const configsWithDefault = objectDefaults(configs, { type: 'number' })

    super(configsWithDefault)
  }
}

export default FieldNumber
