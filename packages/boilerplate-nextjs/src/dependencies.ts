import {
  ModelError,
  ModelNotification,
  ServiceConfigs,
  ServiceNotifications,
  StreamErrors,
  StreamEvents,
  StreamLogs,
  StreamNotifications,
} from '@gnowth/logic-core'

import { configs } from './configs'

const modelError = new ModelError()
const modelNotification = new ModelNotification()
const serviceConfigs = new ServiceConfigs({ configs })

export const dependencies = {
  modelError,
  modelNotification,
  serviceConfigs,
  serviceNotifications: new ServiceNotifications({ dependencies: { serviceConfigs } }),
  streamErrors: new StreamErrors({ dependencies: { modelError } }),
  streamEvents: new StreamEvents(),
  streamLogs: new StreamLogs(),
  streamNotifications: new StreamNotifications({ dependencies: { modelError, modelNotification } }),
}
