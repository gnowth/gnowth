import { objectDefaults } from '@gnowth/lib-utils'

import type { FieldConfigs } from './field'
import { Field } from './field'

export class FieldText extends Field<string> {
  constructor(configs: FieldConfigs<string> = {}) {
    const configsWithDefault = objectDefaults(configs, { default: '', type: 'text' })

    super(configsWithDefault)
  }
}
