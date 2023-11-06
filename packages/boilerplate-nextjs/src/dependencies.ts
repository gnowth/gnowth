import {
  ErrorModel,
  NotificationModel,
  ConfigService,
  NotificationService,
  ErrorStream,
  EventStream,
  LogStream,
  NotificationStream,
} from '@gnowth/logic-core'

import { configs } from './configs'

const errorModel = new ErrorModel()
const notificationModel = new NotificationModel()
const configService = new ConfigService({ configs })

export const dependencies = {
  configService,
  errorModel,
  errorStream: new ErrorStream({ errorModel }),
  eventStream: new EventStream(),
  logStream: new LogStream(),
  notificationModel,
  notificationService: new NotificationService({ configService }),
  notificationStream: new NotificationStream({ errorModel, notificationModel }),
}
