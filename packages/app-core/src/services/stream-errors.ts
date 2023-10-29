import { Subject } from 'rxjs'

import type { ErrorData } from '../models/model-error'
import { ModelError } from '../models/model-error'

// DEBT(investigation): where do we consume it?
export class StreamErrors {
  stream = new Subject<ErrorData>()

  pushErrorUnknown = (error: unknown) => {
    return this.stream.next(ModelError.fromErrorUnknown(error))
  }
}
export const streamErrors = new StreamErrors()
