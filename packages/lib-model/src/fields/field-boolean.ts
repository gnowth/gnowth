import { utils } from '@gnowth/lib-util'

import type { ConfigsAny } from './field-any'
import FieldAny from './field-any'

class FieldBoolean extends FieldAny<boolean> {
  constructor(configs?: ConfigsAny<boolean>) {
    const configsWithDefault = utils.defaults(configs, { type: 'boolean' })

    super(configsWithDefault)
  }
}

export default FieldBoolean
