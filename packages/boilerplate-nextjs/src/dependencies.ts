import { ErrorData, ErrorModel, NotificationStream } from '@gnowth/lib-react'
import { Subject } from 'rxjs'

class ErrorStreamDeprecated {
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

export const dependencies = {
  errorModel: new ErrorModel(),
  errorStream: new ErrorStreamDeprecated(),
  notificationStream: new NotificationStream(),
}
