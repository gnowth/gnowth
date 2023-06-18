import type { ErrorType } from '@gnowth/core-app'
import { ModelError } from '@gnowth/core-app'
import { Subject } from 'rxjs'

// DEBT(investigation): where do we consume it?
class StreamErrors {
  stream = new Subject<ErrorType>()

  pushErrorUnknown = (error: unknown) => {
    return this.stream.next(ModelError.fromErrorUnknown(error))
  }
}

const streamErrors = new StreamErrors()

export default streamErrors
