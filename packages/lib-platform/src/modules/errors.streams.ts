import { Observable, Subject } from 'rxjs'

import type { PlatformParameters } from '../core/platform'
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

export class ErrorStream1 {
  #errorModel = new ErrorModel()
  errorIn: Subject<ErrorData>
  errorOut: Observable<ErrorData>

  nextUnknown = (error: unknown) => {
    return this.errorIn.next(this.#errorModel.fromErrorUnknown(error))
  }

  constructor() {
    this.errorIn = new Subject()
    this.errorOut = this.errorIn
  }

  static async construct(_parameters: PlatformParameters): Promise<ErrorStream1> {
    return new this()
  }

  next(error: ErrorData) {
    return this.errorIn.next(error)
  }
}
