import { Subject } from 'rxjs'

import type { ErrorData } from './errors.types'
import { ErrorModel } from './errors.models'

export class ErrorStream {
  stream = new Subject<ErrorData>()
  #errorModel!: ErrorModel

  constructor() {
    this.onInit()
  }

  onInit() {
    this.#errorModel = new ErrorModel()
  }

  pushErrorUnknown = (error: unknown) => {
    return this.stream.next(this.#errorModel.fromErrorUnknown(error))
  }
}
