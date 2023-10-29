import { ModelError } from '@gnowth/logic-core'

import { StreamErrors } from './services/stream-errors'

const modelError = new ModelError()

export const dependencies = {
  modelError,
  streamErrors: new StreamErrors({ dependencies: { modelError } }),
}
