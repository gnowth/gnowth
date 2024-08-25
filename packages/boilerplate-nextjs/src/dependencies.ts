import { ErrorModel, ErrorStream, NotificationStream } from '@gnowth/lib-react'

export const dependencies = {
  errorModel: new ErrorModel(),
  errorStream: new ErrorStream(),
  notificationStream: new NotificationStream(),
}
