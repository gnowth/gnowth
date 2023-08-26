import { utils } from '@gnowth/lib-util'

import type { ConfigsAny } from './field-any'
import FieldAny from './field-any'

class FieldDate extends FieldAny<Date> {
  constructor(configs?: ConfigsAny<Date>) {
    const configsWithDefault = utils.defaults(configs, { type: 'date' })

    super(configsWithDefault)
  }
}

export default FieldDate
