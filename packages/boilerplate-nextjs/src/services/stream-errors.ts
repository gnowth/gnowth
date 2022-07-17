import { Subject } from 'rxjs'

import type { ErrorType } from '../models/model-error'
import ModelError from '../models/model-error'

// DEBT: where do we consume it?
class StreamErrors {
  stream = new Subject<ErrorType>()

  pushErrorUnknown = (error: unknown) => {
    return this.stream.next(ModelError.fromErrorUnknown(error))
  }
}

export default new StreamErrors()
