import { ModelError } from '@gnowth/logic-core'

import { StreamToasts } from './services/stream-toasts'
import { ModelNotification } from './models/model-notification'
import { StreamLogs } from './services/stream-logs'
import { StreamEvents } from './services/stream-events'
import { StreamErrors } from './services/stream-errors'
import { ServiceNotifications } from './services/service-notifications'
import { ServiceConfigs } from './services/service-configs'

const modelError = new ModelError()
const modelNotification = new ModelNotification()

export const dependencies = {
  modelError,
  modelNotification,
  serviceConfigs: new ServiceConfigs(),
  serviceNotifications: new ServiceNotifications(),
  streamErrors: new StreamErrors({ dependencies: { modelError } }),
  streamEvents: new StreamEvents(),
  streamLogs: new StreamLogs(),
  streamToasts: new StreamToasts({ dependencies: { modelError, modelNotification } }),
}
