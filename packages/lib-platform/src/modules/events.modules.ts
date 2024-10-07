import { PlatformDependency, PlatformParameters } from '../core/platform'
import { EventService } from './events.services'
import { EventStream } from './events.streams'

export class EventModule {
  static async construct(parameters: PlatformParameters): Promise<EventModule> {
    await parameters.platform.moduleMountDependencies({
      constructors: parameters.constructors,
      constructorsDefault: {
        providers: {
          [PlatformDependency.eventService]: EventService,
          [PlatformDependency.eventStream]: EventStream,
        },
      },
    })
    return new this()
  }
}
