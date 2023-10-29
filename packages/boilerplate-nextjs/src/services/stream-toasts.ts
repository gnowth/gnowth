import type { ErrorData, ModelError } from '@gnowth/logic-core'
import { Subject } from 'rxjs'

import type { ModelNotification, Notification } from '../models/model-notification'

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

export class StreamToasts {
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
