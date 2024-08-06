import { ErrorCustom } from '@gnowth/lib-utils'

import type { Platform } from './platform'
import type { PlatformProviderConstructor, PlatformProviderDefinition } from './platform-module.types'

type Parameters = {
  components?: Record<string, unknown>
  controllers?: Record<string, unknown>
  modules?: Record<string, typeof PlatformModule>
  platform: Platform
  // clients/repositories, streams, services, resources, schema etc..
  providers?: Record<string, PlatformProviderConstructor>
}

export class PlatformModule {
  #providers: Map<string, object> = new Map()
  protected parameters: Parameters
  protected platform: Platform

  constructor(parameters: Parameters) {
    this.platform = parameters.platform
    this.parameters = parameters
  }

  static async construct(parameters: Parameters): Promise<PlatformModule> {
    return new this(parameters)
  }

  protected static getParameters<TParameters extends Parameters>(
    parameters: TParameters,
    parametersDefault?: Partial<TParameters>,
  ): TParameters {
    return {
      ...parametersDefault,
      ...parameters,
      components: { ...parametersDefault?.components, ...parameters?.components },
      controllers: { ...parametersDefault?.controllers, ...parameters?.controllers },
      modules: { ...parametersDefault?.modules, ...parameters?.modules },
      providers: { ...parametersDefault?.providers, ...parameters?.providers },
    }
  }

  async providerGet<TProvider extends object>(definition: PlatformProviderDefinition): Promise<TProvider> {
    await this.providerMount(definition)
    return this.#providers.get(definition.name) as TProvider
  }

  protected async providerMount(definition: PlatformProviderDefinition): Promise<void> {
    if (this.#providers.has(definition.name)) {
      return
    }
    const Provider = this.parameters.providers?.[definition.name]
    if (!Provider) {
      throw new ErrorCustom({
        code: 'lib-platform--platform-module--01',
        message: `not enough data to load provider: ${definition.name}`,
        trace: {
          caller: 'platformModule.#providerMount',
          context: 'platformModule',
          source: 'lib-platform',
        },
      })
    }
    const provider = await Provider.construct({ module: this })
    this.#providers.set(definition.name, provider)
  }
}
