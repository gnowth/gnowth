import { objectDefaults } from '@gnowth/lib-utils'

import type { ConfigsAny } from './field-any'
import { FieldAny } from './field-any'

export class FieldText extends FieldAny<string> {
  constructor(configs: ConfigsAny<string> = {}) {
    const configsWithDefault = objectDefaults(configs, { default: '', type: 'text' })

    super(configsWithDefault)
  }
}
