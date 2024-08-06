import type { UtilValues } from '@gnowth/lib-utils'

import type { Platform } from '../core/platform.main'

import { PlatformModule, PlatformProviderConstructor } from '../core/platform-module'
import { LocaleService } from './locales.services'

type Parameters = { platform: Platform; providers?: Record<string, PlatformProviderConstructor> }
export class LocaleModule extends PlatformModule {
  providerToken = { service: 'service' } as const

  static async construct(parameters: Parameters): Promise<LocaleModule> {
    const module = new this(this.#addDefaultParameters(parameters))
    await module.providerMount({ name: module.providerToken.service })
    return module
  }

  static #addDefaultParameters(parameters: Parameters): Parameters {
    return PlatformModule.getParameters(parameters, {
      providers: {
        service: LocaleService,
      } satisfies Record<UtilValues<LocaleModule['providerToken']>, PlatformProviderConstructor>,
    })
  }
}
