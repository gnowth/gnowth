import { objectDefaults } from '@gnowth/lib-utils'

import type { ConfigsAny } from './field-any'
import FieldAny from './field-any'

class FieldBoolean extends FieldAny<boolean> {
  constructor(configs: ConfigsAny<boolean> = {}) {
    const configsWithDefault = objectDefaults(configs, { type: 'boolean' })

    super(configsWithDefault)
  }
}

export default FieldBoolean
