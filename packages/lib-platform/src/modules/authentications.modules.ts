import type { UtilValues } from '@gnowth/lib-utils'

import type { Platform } from '../core/platform'
import type { PlatformProviderConstructor } from '../core/platform-module'

import { PlatformModule } from '../core/platform-module.main'
import { AuthenticationClient } from './authentications.clients'
import { AuthenticationObservable } from './authentications.observables'
import { AuthenticationService } from './authentications.services'

type Parameters = { platform: Platform; providers?: Record<string, PlatformProviderConstructor> }
export class AuthenticationModule extends PlatformModule {
  providerToken = { client: 'client', observable: 'observable', service: 'service' } as const

  static async construct(parameters: Parameters): Promise<AuthenticationModule> {
    const module = new this(this.#addDefaultParameters(parameters))
    await module.providerMount({ name: module.providerToken.client })
    await module.providerMount({ name: module.providerToken.observable })
    await module.providerMount({ name: module.providerToken.service })
    return module
  }

  static #addDefaultParameters(parameters: Parameters): Parameters {
    return PlatformModule.getParameters(parameters, {
      providers: {
        client: AuthenticationClient,
        observable: AuthenticationObservable,
        service: AuthenticationService,
      } satisfies Record<UtilValues<AuthenticationModule['providerToken']>, PlatformProviderConstructor>,
    })
  }
}
