import * as R from 'remeda'

import { Field, FieldConfigs } from './field'

export class FieldText extends Field<string> {
  constructor(configs: FieldConfigs<string> = {}) {
    const configsWithDefault = R.merge({ default: '', type: 'text' }, configs)

    super(configsWithDefault)
  }
}
