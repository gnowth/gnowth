import * as Fields from '../fields'
import ModelUuid from './model-uuid'

interface DefaultFilter {
  page: number
  pageSize: number
  uuid: string
}

class ModelFilter<
  Params extends DefaultFilter = DefaultFilter,
  Value extends DefaultFilter = DefaultFilter, // eslint-disable-line prettier/prettier
> extends ModelUuid<Value> {
  schema = {
    page: new Fields.FieldNumber(),
    pageSize: new Fields.FieldNumber(),
    uuid: new Fields.FieldText(),
  }

  // TODO
  valueToParams(value: Value): Params {
    return value as unknown as Params
  }
}

export default ModelFilter
