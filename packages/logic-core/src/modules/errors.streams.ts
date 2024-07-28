import { Subject } from 'rxjs'

import type { ErrorData } from './errors.types'

import { ErrorModel } from './errors.models'

export class ErrorStream {
  #errorModel!: ErrorModel
  pushErrorUnknown = (error: unknown) => {
    return this.stream.next(this.#errorModel.fromErrorUnknown(error))
  }

  stream = new Subject<ErrorData>()

  constructor() {
    this.onInit()
  }

  onInit() {
    this.#errorModel = new ErrorModel()
  }
}
