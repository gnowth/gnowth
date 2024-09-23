import * as R from 'remeda'

import { Field, FieldConfigs } from './field'

export class FieldBoolean extends Field<boolean> {
  constructor(configs: FieldConfigs<boolean> = {}) {
    const configsWithDefault = R.merge({ type: 'boolean' }, configs)

    super(configsWithDefault)
  }
}
