import { utils } from '@gnowth/lib-util'

import type { ConfigsAny } from './field-any'
import FieldAny from './field-any'

class FieldText extends FieldAny<string> {
  constructor(configs?: ConfigsAny<string>) {
    const configsWithDefault = utils.defaults(configs, { default: '', type: 'text' })

    super(configsWithDefault)
  }
}

export default FieldText
