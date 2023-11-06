import { Subject } from 'rxjs'

import type { ErrorData, ErrorModel } from './errors'
import type { NotificationModel, Notification } from './notifications.models'

interface Toast {
  description?: string
  isClosable: boolean
  status: 'error' | 'info'
  title: string
}

type Parameters = {
  errorModel: ErrorModel
  notificationModel: NotificationModel
}

export class NotificationStream {
  stream = new Subject<Toast>()
  #errorModel: ErrorModel
  #notificationModel: NotificationModel
  #parameters: Parameters

  constructor(parameters: Parameters) {
    this.#parameters = parameters
    this.#errorModel = parameters.errorModel
    this.#notificationModel = parameters.notificationModel
  }

  pushError = (error: ErrorData) => {
    return this.stream.next(this.#errorModel.toToast(error))
  }

  pushNotification = (notification: Notification) => {
    return this.stream.next(this.#notificationModel.toToast(notification))
  }
}
