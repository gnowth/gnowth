import { PlatformParameters } from '../core/platform'
import { PlatformConstant } from '../core/platform.constants'
import { EventService } from './events.services'
import { EventStream } from './events.streams'

export class EventModule {
  static async construct(parameters: PlatformParameters): Promise<EventModule> {
    await parameters.platform.moduleMountDependencies({
      constructors: parameters.constructors,
      constructorsDefault: {
        providers: {
          [PlatformConstant.eventService]: EventService,
          [PlatformConstant.eventStream]: EventStream,
        },
      },
    })
    return new this()
  }
}
