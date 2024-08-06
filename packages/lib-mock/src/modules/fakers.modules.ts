import type { LocaleModule, Platform } from '@gnowth/lib-platform'
import type { UtilValues } from '@gnowth/lib-utils'

import { PlatformModule, PlatformProviderConstructor } from '@gnowth/lib-platform'

import { FakerService } from './fakers.services'

type Parameters = {
  localeModule?: LocaleModule
  platform: Platform
  providers?: Record<string, PlatformProviderConstructor>
}
export class FakerModule extends PlatformModule {
  localeModule: LocaleModule
  providerToken = { service: 'service' } as const

  constructor(parameters: Required<Parameters>) {
    super(parameters)
    this.localeModule = parameters.localeModule
  }

  static async construct(parameters: Parameters): Promise<FakerModule> {
    const localeModule =
      parameters.localeModule ??
      (await parameters.platform.moduleGet<LocaleModule>({ name: parameters.platform.moduleToken.locale }))
    const module = new this(this.#addDefaultParameters({ providers: {}, ...parameters, localeModule }))
    await module.providerMount({ name: module.providerToken.service })
    return module
  }

  static #addDefaultParameters(parameters: Required<Parameters>): Required<Parameters> {
    return PlatformModule.getParameters(parameters, {
      providers: {
        service: FakerService,
      } satisfies Record<UtilValues<FakerModule['providerToken']>, PlatformProviderConstructor>,
    })
  }
}
