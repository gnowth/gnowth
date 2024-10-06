import { Subject } from 'rxjs'

import { PlatformDependency, PlatformParameters } from '../core/platform'
import { ErrorData, ErrorModel } from './errors'
import { Notification, NotificationModel } from './notifications.models'

interface Toast {
  description?: string
  isClosable: boolean
  status: 'error' | 'info'
  title: string
}
type Parameters = { errorModel: ErrorModel; notificationModel: NotificationModel }
export class NotificationStream {
  #errorModel: ErrorModel
  #notificationModel: NotificationModel

  pushError = (error: ErrorData) => {
    return this.stream.next(this.#errorModel.toToast(error))
  }

  pushNotification = (notification: Notification) => {
    return this.stream.next(this.#notificationModel.toToast(notification))
  }

  stream = new Subject<Toast>()

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
}
