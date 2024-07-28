import { Subject } from 'rxjs'

import type { ErrorData } from './errors'
import type { Notification } from './notifications.models'

import { ErrorModel } from './errors'
import { NotificationModel } from './notifications.models'

interface Toast {
  description?: string
  isClosable: boolean
  status: 'error' | 'info'
  title: string
}

export class NotificationStream {
  #errorModel!: ErrorModel
  #notificationModel!: NotificationModel
  pushError = (error: ErrorData) => {
    return this.stream.next(this.#errorModel.toToast(error))
  }

  pushNotification = (notification: Notification) => {
    return this.stream.next(this.#notificationModel.toToast(notification))
  }

  stream = new Subject<Toast>()

  // TODO: remove
  constructor() {
    this.onInit()
  }

  // TODO: align with repository
  onInit() {
    this.#errorModel = new ErrorModel()
    this.#notificationModel = new NotificationModel()
  }
}
