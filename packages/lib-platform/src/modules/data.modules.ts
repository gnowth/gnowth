import type { UtilValues } from '@gnowth/lib-utils'

import type { Platform } from '../core/platform'
import type { PlatformProviderConstructor } from '../core/platform-module.types'

import { PlatformModule } from '../core/platform-module'
import { DataService } from './data.services'

type Parameters = { platform: Platform; providers?: Record<string, PlatformProviderConstructor> }
export class DataModule extends PlatformModule {
  providerToken = { service: 'service' } as const

  static async construct(parameters: Parameters): Promise<DataModule> {
    const module = new this(this.#addDefaultParameters(parameters))
    await module.providerMount({ name: module.providerToken.service })
    return module
  }

  static #addDefaultParameters(parameters: Parameters): Parameters {
    return PlatformModule.getParameters(parameters, {
      providers: {
        service: DataService,
      } satisfies Record<UtilValues<DataModule['providerToken']>, PlatformProviderConstructor>,
    })
  }
}
