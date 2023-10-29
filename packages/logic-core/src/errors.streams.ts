import { Subject } from 'rxjs'

import type { ModelError } from './errors.models'
import type { ErrorData } from './errors.types'

type Parameters = { dependencies: Dependencies }
type Dependencies = { modelError: ModelError }

export class StreamErrors {
  stream = new Subject<ErrorData>()
  #modelError: ModelError
  #parameters: Parameters

  constructor(parameters: Parameters) {
    this.#parameters = parameters
    this.#modelError = parameters.dependencies.modelError
  }

  pushErrorUnknown = (error: unknown) => {
    return this.stream.next(this.#modelError.fromErrorUnknown(error))
  }
}
