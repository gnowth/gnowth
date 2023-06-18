import type { ErrorType } from '@gnowth/core-app'
import { ModelError } from '@gnowth/core-app'
import { Subject } from 'rxjs'

import type { Notification } from '../models/model-notification'
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

const streamToasts = new StreamToasts()

export default streamToasts
