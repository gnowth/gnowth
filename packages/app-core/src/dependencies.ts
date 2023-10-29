import { ModelError, StreamErrors } from '@gnowth/logic-core'

const modelError = new ModelError()

export const dependencies = {
  modelError,
  streamErrors: new StreamErrors({ dependencies: { modelError } }),
}
