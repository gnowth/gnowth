import { Subject } from 'rxjs'

import { PlatformConstant, PlatformParameters } from '../core/platform'
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
      name: PlatformConstant.errorModel,
      type: 'provider',
    })
    const notificationModel = await parameters.platform.providerGet<NotificationModel>({
      name: PlatformConstant.notificationModel,
      type: 'provider',
    })
    return new this({ errorModel, notificationModel })
  }
}
