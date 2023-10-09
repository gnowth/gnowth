import type { ErrorType } from '@gnowth/app-core'
import { ModelError } from '@gnowth/app-core'
import { Subject } from 'rxjs'

// DEBT(investigation): where do we consume it?
export class StreamErrors {
  stream = new Subject<ErrorType>()

  pushErrorUnknown = (error: unknown) => {
    return this.stream.next(ModelError.fromErrorUnknown(error))
  }
}

export const streamErrors = new StreamErrors()
