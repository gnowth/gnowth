import { PlatformConstant, PlatformParameters } from '../core/platform'
import { NotificationStream } from './notifications.streams'

export class NotificationModule {
  static async construct(parameters: PlatformParameters): Promise<NotificationModule> {
    await parameters.platform.moduleMountDependencies({
      constructors: parameters.constructors,
      constructorsDefault: {
        providers: { [PlatformConstant.notificationStream]: NotificationStream },
      },
    })
    return new this()
  }
}
