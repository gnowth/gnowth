import { ErrorModel, ErrorStream, NotificationStream } from '@gnowth/logic-core'

export const dependencies = {
  errorModel: new ErrorModel(),
  errorStream: new ErrorStream(),
  notificationStream: new NotificationStream(),
}
