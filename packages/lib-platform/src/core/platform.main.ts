import type { UtilValues } from '@gnowth/lib-utils'

import { ErrorCustom } from '@gnowth/lib-utils'
import * as R from 'remeda'

import type { ScriptService } from '../modules/scripts'
import type { PlatformModuleDefinition } from './platform-module.types'

import { AuthenticationModule } from '../modules/authentications'
import { DataModule } from '../modules/data'
import { EventModule } from '../modules/events'
import { LocaleModule } from '../modules/locales'
import { ScriptModule } from '../modules/scripts'
import { PlatformModule } from './platform-module'

type Parameters = {
  moduleUrlBuilder?: (definition: PlatformModuleDefinition) => string
  modules?: Record<string, typeof PlatformModule>
}

// TODO: @ErrorTrace({ context: 'Platform', source: 'lib-platform })
export class Platform {
  #modules: Map<string, PlatformModule> = new Map()
  #parameters: Parameters
  moduleToken = {
    authentication: 'platformAuthentication',
    data: 'platformData',
    event: 'platformEvent',
    locale: 'platformLocale',
    script: 'platformScript',
  } as const

  constructor(parameters?: Parameters) {
    this.#parameters = parameters ?? {}
  }

  static async construct(parameters?: Parameters): Promise<Platform> {
    const platform = new this(this.#addDefaultParameters(parameters))
    await platform.#moduleMount({ name: platform.moduleToken.script })
    return platform
  }

  static #addDefaultParameters(parameters?: Parameters): Parameters {
    // TODO
    const modules: Record<UtilValues<Platform['moduleToken']>, typeof PlatformModule> = {
      platformAuthentication: AuthenticationModule,
      platformData: DataModule,
      platformEvent: EventModule,
      platformLocale: LocaleModule,
      platformScript: ScriptModule,
    }
    return {
      ...parameters,
      modules: { ...modules, ...parameters?.modules },
    }
  }

  #moduleGuardConstructor(module: unknown): module is typeof PlatformModule {
    return (
      !!module &&
      typeof module === 'function' &&
      'prototype' in module &&
      module.prototype instanceof PlatformModule
    )
  }

  // TODO: @ErrorTrace({ caller: 'platform.#moduleGet' })
  async #moduleLoad<TModule extends typeof PlatformModule>(
    definition: PlatformModuleDefinition,
  ): Promise<TModule> {
    const url = definition.url ?? this.#parameters.moduleUrlBuilder?.(definition)
    if (!R.isString(url)) {
      throw new ErrorCustom({
        code: 'lib-platform--platform--01',
        message: `not enough data to load dependency: ${definition.name}`,
        trace: {
          caller: 'platform.#moduleLoad',
          context: 'platform',
          source: 'lib-platform',
        },
      })
    }
    const scriptModule = await this.moduleGet<ScriptModule>({ name: this.moduleToken.script })
    const scriptService = await scriptModule.providerGet<ScriptService>({
      name: scriptModule.providerToken.service,
    })
    // TODO: get named export
    return scriptService.import({ url })
  }

  async #moduleMount(definition: PlatformModuleDefinition) {
    if (this.#modules.has(definition.name)) {
      return
    }
    // need to make sure there is no duplicate call and initialization and it does not get overwritten by another async call
    // check if constructor has requirement
    // check for preload
    const modules = { ...this.#parameters.modules, ...definition.modules }
    const Module = modules[definition.name] ?? (await this.#moduleLoad(definition))
    if (!this.#moduleGuardConstructor(Module)) {
      throw new ErrorCustom({
        code: 'lib-platform--platform--02',
        message: `module (${definition.name}) is not a valid`,
        trace: {
          caller: 'platform.#moduleMount',
          context: 'platform',
          source: 'lib-platform',
        },
      })
    }
    const module = await Module.construct({ modules, platform: this })
    this.#modules.set(definition.name, module)
  }

  async moduleGet<TModule extends PlatformModule>(definition: PlatformModuleDefinition): Promise<TModule> {
    await this.#moduleMount(definition)
    return this.#modules.get(definition.name) as TModule
  }
}
