import { objectDefaults } from '@gnowth/lib-utils'

import { Field, FieldConfigs } from './field'

export class FieldText extends Field<string> {
  constructor(configs: FieldConfigs<string> = {}) {
    const configsWithDefault = objectDefaults(configs, { default: '', type: 'text' })

    super(configsWithDefault)
  }
}
