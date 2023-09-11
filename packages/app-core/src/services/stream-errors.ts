import { Subject } from 'rxjs'

import type { ErrorType } from '../models/model-error'
import { ModelError } from '../models/model-error'

// DEBT(investigation): where do we consume it?
export class StreamErrors {
  stream = new Subject<ErrorType>()

  pushErrorUnknown = (error: unknown) => {
    return this.stream.next(ModelError.fromErrorUnknown(error))
  }
}
export const streamErrors = new StreamErrors()
