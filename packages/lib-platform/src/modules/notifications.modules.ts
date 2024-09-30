import { PlatformConstant, PlatformParameters } from '../core/platform'
import { NotificationModel } from './notifications.models'
import { NotificationStream } from './notifications.streams'

export class NotificationModule {
  static async construct(parameters: PlatformParameters): Promise<NotificationModule> {
    await parameters.platform.moduleMountDependencies({
      constructors: parameters.constructors,
      constructorsDefault: {
        providers: {
          [PlatformConstant.notificationModel]: NotificationModel,
          [PlatformConstant.notificationStream]: NotificationStream,
        },
      },
    })
    return new this()
  }
}
