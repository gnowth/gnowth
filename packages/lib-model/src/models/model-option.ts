import * as Fields from '../fields'
import Model from './model'

interface DefaultOption {
  label: string
  value: string
}

class ModelOption<Value extends DefaultOption = DefaultOption> extends Model<Value> {
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

export default ModelOption
