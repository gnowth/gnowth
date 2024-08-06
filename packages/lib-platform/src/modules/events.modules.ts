import type { UtilValues } from '@gnowth/lib-utils'

import type { Platform } from '../core/platform'
import type { PlatformProviderConstructor } from '../core/platform-module'

import { PlatformModule } from '../core/platform-module'
import { EventObservable } from './events.observables'
import { EventService } from './events.services'

type Parameters = { platform: Platform; providers?: Record<string, PlatformProviderConstructor> }
export class EventModule extends PlatformModule {
  providerToken = { observable: 'observable', service: 'service' } as const

  static async construct(parameters: Parameters): Promise<EventModule> {
    const module = new this(this.#addDefaultParameters(parameters))
    await module.providerMount({ name: module.providerToken.observable })
    await module.providerMount({ name: module.providerToken.service })
    return module
  }

  static #addDefaultParameters(parameters: Parameters): Parameters {
    return PlatformModule.getParameters(parameters, {
      providers: {
        observable: EventObservable,
        service: EventService,
      } satisfies Record<UtilValues<EventModule['providerToken']>, PlatformProviderConstructor>,
    })
  }
}
