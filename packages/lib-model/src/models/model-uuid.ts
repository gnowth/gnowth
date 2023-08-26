import * as Fields from '../fields'
import Model from './model'

interface DefaultUuid {
  uuid: string
}

class ModelUuid<Value extends DefaultUuid = DefaultUuid> extends Model<Value> {
  schema = {
    uuid: new Fields.FieldText(),
  }

  valueToId(value: Value): string {
    return value.uuid
  }

  valueToString(value: Value): string {
    return value.uuid
  }
}

export default ModelUuid
