import { Observable, Subject } from 'rxjs'

import { PlatformParameters } from '../core/platform'
import { ErrorModel } from './errors.models'
import { ErrorData } from './errors.types'

export class ErrorStream {
  #errorModel = new ErrorModel()
  readonly errorIn$: Subject<ErrorData>
  readonly errorOut$: Observable<ErrorData>

  nextUnknown = (error: unknown) => {
    return this.errorIn$.next(this.#errorModel.fromErrorUnknown(error))
  }

  constructor() {
    this.errorIn$ = new Subject()
    this.errorOut$ = this.errorIn$
  }

  static async construct(_parameters: PlatformParameters): Promise<ErrorStream> {
    return new this()
  }

  next(error: ErrorData) {
    return this.errorIn$.next(error)
  }
}
