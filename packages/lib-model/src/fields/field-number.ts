import { utils } from '@gnowth/lib-util'

import type { ConfigsAny } from './field-any'
import FieldAny from './field-any'

class FieldNumber extends FieldAny<number> {
  constructor(configs?: ConfigsAny<number>) {
    const configsWithDefault = utils.defaults(configs, { type: 'number' })

    super(configsWithDefault)
  }
}

export default FieldNumber
