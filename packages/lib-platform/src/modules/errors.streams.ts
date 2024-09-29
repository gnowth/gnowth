import { Observable, Subject } from 'rxjs'

import { PlatformConstant, PlatformParameters } from '../core/platform'
import { ErrorModel } from './errors.models'
import { ErrorData } from './errors.types'

type Parameters = { errorModel: ErrorModel }
export class ErrorStream {
  #errorModel: ErrorModel
  readonly errorIn$: Subject<ErrorData>
  readonly errorOut$: Observable<ErrorData>

  nextUnknown = (error: unknown) => {
    return this.errorIn$.next(this.#errorModel.fromErrorUnknown(error))
  }

  constructor(parameters: Parameters) {
    this.#errorModel = parameters.errorModel
    this.errorIn$ = new Subject()
    this.errorOut$ = this.errorIn$
  }

  static async construct(parameters: PlatformParameters): Promise<ErrorStream> {
    const errorModel = await parameters.platform.providerGet<ErrorModel>({
      name: PlatformConstant.errorModel,
      type: 'provider',
    })
    return new this({ errorModel })
  }

  next(error: ErrorData) {
    return this.errorIn$.next(error)
  }
}
