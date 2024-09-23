import * as R from 'remeda'

import { Field, FieldConfigs } from './field'

export class FieldNumber extends Field<number> {
  constructor(configs: FieldConfigs<number> = {}) {
    const configsWithDefault = R.merge({ type: 'number' }, configs)

    super(configsWithDefault)
  }
}
