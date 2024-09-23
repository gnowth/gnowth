import * as R from 'remeda'

import { Field, FieldConfigs } from './field'

export class FieldDate extends Field<Date> {
  constructor(configs: FieldConfigs<Date> = {}) {
    const configsWithDefault = R.merge({ type: 'date' }, configs)

    super(configsWithDefault)
  }
}
