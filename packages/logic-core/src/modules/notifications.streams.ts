import { Subject } from 'rxjs'

import type { ErrorData, ModelError } from './errors'
import type { ModelNotification, Notification } from './notifications.models'

interface Toast {
  description?: string
  isClosable: boolean
  status: 'error' | 'info'
  title: string
}

type Parameters = { dependencies: Dependencies }
type Dependencies = {
  modelError: ModelError
  modelNotification: ModelNotification
}

export class StreamNotifications {
  stream = new Subject<Toast>()
  #modelError: ModelError
  #modelNotification: ModelNotification
  #parameters: Parameters

  constructor(parameters: Parameters) {
    this.#parameters = parameters
    this.#modelError = parameters.dependencies.modelError
    this.#modelNotification = parameters.dependencies.modelNotification
  }

  pushError = (error: ErrorData) => {
    return this.stream.next(this.#modelError.toToast(error))
  }

  pushNotification = (notification: Notification) => {
    return this.stream.next(this.#modelNotification.toToast(notification))
  }
}
