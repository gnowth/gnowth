import * as Fields from '../fields'
import { Model } from './model'

type DefaultUuid = {
  uuid: string
}

export class UuidModel<Value extends DefaultUuid = DefaultUuid> extends Model<Value> {
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
