import { Subject } from 'rxjs'

import { PlatformDependency, PlatformParameters } from '../core/platform'
import { ErrorData, ErrorModel } from './errors'
import { Notification, NotificationModel } from './notifications.models'

type Parameters = { errorModel: ErrorModel; notificationModel: NotificationModel }
type Toast = {
  closeButton?: boolean
  message: string
  type?: 'error' | 'info' | 'success' | 'warning'
}
export class NotificationStream {
  stream = new Subject<Toast>()
  #errorModel: ErrorModel

  #notificationModel: NotificationModel

  constructor(parameters: Parameters) {
    this.#errorModel = parameters.errorModel
    this.#notificationModel = parameters.notificationModel
  }

  static async construct(parameters: PlatformParameters) {
    const errorModel = await parameters.platform.providerGet<ErrorModel>({
      name: PlatformDependency.errorModel,
    })
    const notificationModel = await parameters.platform.providerGet<NotificationModel>({
      name: PlatformDependency.notificationModel,
    })
    return new this({ errorModel, notificationModel })
  }

  pushError = (error: ErrorData) => {
    return this.stream.next(this.#errorModel.toToast(error))
  }

  pushNotification = (notification: Notification) => {
    return this.stream.next(this.#notificationModel.toToast(notification))
  }
}
