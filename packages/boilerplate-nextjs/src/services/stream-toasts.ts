import { Subject } from 'rxjs'

import type { ErrorType } from '../models/model-error'
import type { Notification } from '../models/model-notification'
import ModelError from '../models/model-error'
import ModelNotification from '../models/model-notification'

interface Toast {
  description?: string
  isClosable: boolean
  status: 'error' | 'info'
  title: string
}

class StreamToasts {
  stream = new Subject<Toast>()

  pushError = (error: ErrorType) => {
    return this.stream.next(ModelError.toToast(error))
  }

  pushNotification = (notification: Notification) => {
    return this.stream.next(ModelNotification.toToast(notification))
  }
}

export default new StreamToasts()
