import * as Fields from '../fields'
import { Model } from './model'

type DefaultOption = {
  label: string
  value: string
}

export class OptionModel<Value extends DefaultOption = DefaultOption> extends Model<Value> {
  schema = {
    label: new Fields.FieldText(),
    value: new Fields.FieldText(),
  }

  valueToId(value: Value): string {
    return value.value
  }

  valueToString(value: Value): string {
    return value.label
  }
}
