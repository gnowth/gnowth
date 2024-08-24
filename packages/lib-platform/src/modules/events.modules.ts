import type { PlatformParameters } from '../core/platform'

import { PlatformConstant } from '../core/platform.constants'
import { EventObservable } from './events.observables'
import { EventService } from './events.services'

export class EventModule {
  static async construct(parameters: PlatformParameters): Promise<EventModule> {
    await parameters.platform.moduleMountDependencies({
      constructors: parameters.constructors,
      constructorsDefault: {
        providers: {
          [PlatformConstant.eventObservable]: EventObservable,
          [PlatformConstant.eventService]: EventService,
        },
      },
    })
    return new this()
  }
}
