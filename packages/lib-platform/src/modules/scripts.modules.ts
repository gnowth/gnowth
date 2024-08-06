import type { UtilValues } from '@gnowth/lib-utils'

import type { Platform } from '../core/platform.main'

import { PlatformModule, PlatformProviderConstructor } from '../core/platform-module'
import { ScriptService } from './scripts.services'

type Parameters = { platform: Platform; providers?: Record<string, PlatformProviderConstructor> }
export class ScriptModule extends PlatformModule {
  providerToken = { service: 'service' } as const

  static async construct(parameters: Parameters): Promise<ScriptModule> {
    const module = new this(this.#addDefaultParameters(parameters))
    await module.providerMount({ name: module.providerToken.service })
    return module
  }

  static #addDefaultParameters(parameters: Parameters): Parameters {
    return PlatformModule.getParameters(parameters, {
      providers: {
        service: ScriptService,
      } satisfies Record<UtilValues<ScriptModule['providerToken']>, PlatformProviderConstructor>,
    })
  }
}
