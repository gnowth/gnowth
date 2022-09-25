import type { ErrorType } from '@app/core'
import { ModelError } from '@app/core'
import { Subject } from 'rxjs'

// DEBT(investigation): where do we consume it?
class StreamErrors {
  stream = new Subject<ErrorType>()

  pushErrorUnknown = (error: unknown) => {
    return this.stream.next(ModelError.fromErrorUnknown(error))
  }
}

export default new StreamErrors()
