import { ErrorCustom } from '@gnowth/lib-utils'
import * as R from 'remeda'

import { ScriptService } from '../modules/scripts'
import { PlatformConstant } from './platform.constants'
import { modules } from './platform.modules'
import {
  PlatformConstructor,
  PlatformConstructors,
  PlatformDefinition,
  PlatformDefinitionClient,
  PlatformDefinitionController,
  PlatformDefinitionModule,
  PlatformDefinitionProvider,
} from './platform.types'

type Parameters = {
  constructors?: PlatformConstructors
  dependencyUrlBuilder?: (definition: PlatformDefinition) => string
}

type PlatformModuleDependencies = {
  constructors?: PlatformConstructors
  constructorsDefault: PlatformConstructors
}

// TODO: @ErrorTrace({ context: 'Platform', source: 'lib-platform })
// TODO: only mount required dependencies even if it is already loaded
// TODO: load, mount, get. mount/get should be able to mount/get targeted variant. load should store all variant in constructors
export class Platform {
  #clients: Map<string, Map<string, object>> = new Map()
  #components: Map<string, object> = new Map()
  #controllers: Map<string, object> = new Map()
  #modules: Map<string, object> = new Map()
  #parameters: Parameters
  #providers: Map<string, object> = new Map()

  constructor(parameters?: Parameters) {
    this.#parameters = parameters ?? {}
  }

  static async construct(parameters?: Parameters): Promise<Platform> {
    const constructors = this.constructorMerge({ modules }, parameters?.constructors)
    const platform = new this({ ...parameters, constructors })
    await platform.moduleMount({ constructors, name: PlatformConstant.scriptModule, type: 'module' })
    await platform.moduleMountDependencies({ constructorsDefault: constructors })
    return platform
  }

  static constructorMerge(
    override1?: PlatformConstructors,
    override2?: PlatformConstructors,
  ): PlatformConstructors {
    return R.mergeDeep(override1 ?? {}, override2 ?? {})
  }

  #constructorGuard(module: unknown): module is PlatformConstructor {
    return R.isFunction(module) && 'construct' in module
  }

  #definitionFromConstructors(constructors: PlatformConstructors): PlatformDefinition[] {
    return [
      ...R.pipe(
        constructors.clients ?? {},
        R.keys(),
        R.flatMap((name) =>
          R.pipe(
            constructors.clients?.[name] ?? {},
            R.keys(),
            R.map((variant) => ({ constructors, name, type: 'client' as const, variant })),
          ),
        ),
      ),
      ...R.pipe(
        constructors.components ?? {},
        R.keys(),
        R.map((name) => ({ constructors, name, type: 'component' as const })),
      ),
      ...R.pipe(
        constructors.controllers ?? {},
        R.keys(),
        R.map((name) => ({ constructors, name, type: 'controller' as const })),
      ),
      ...R.pipe(
        constructors.modules ?? {},
        R.keys(),
        R.map((name) => ({ constructors, name, type: 'module' as const })),
      ),
      ...R.pipe(
        constructors.providers ?? {},
        R.keys(),
        R.map((name) => ({ constructors, name, type: 'provider' as const })),
      ),
    ]
  }

  #dependencyGet(definition: PlatformDefinition): object | undefined {
    if (definition.type === 'client') {
      const map = this.#clients.get(definition.name)
      return definition.variant ? map?.get(definition.variant) : map?.values().next().value
    }
    if (definition.type === 'component') {
      // TODO
      return this.#components.get(definition.name)
    }
    if (definition.type === 'controller') {
      return this.#controllers.get(definition.name)
    }
    if (definition.type === 'module') {
      return this.#modules.get(definition.name)
    }
    if (definition.type === 'provider') {
      return this.#providers.get(definition.name)
    }
  }

  #dependencyGetConstructor(definition: PlatformDefinition): PlatformConstructor | undefined {
    const constructors = Platform.constructorMerge(this.#parameters.constructors, definition.constructors)
    if (definition.type === 'client') {
      const clients = constructors.clients?.[definition.name] ?? {}
      return definition.variant ? clients[definition.variant] : R.values(clients).at(0)
    }
    if (definition.type === 'component') {
      // TODO
      return constructors.components?.[definition.name]
    }
    if (definition.type === 'controller') {
      return constructors.controllers?.[definition.name]
    }
    if (definition.type === 'module') {
      return constructors.modules?.[definition.name]
    }
    if (definition.type === 'provider') {
      return constructors.providers?.[definition.name]
    }
  }

  async #dependencyMount(definition: PlatformDefinition): Promise<void> {
    if (!!this.#dependencyGet(definition)) {
      return
    }
    // TODO: need to make sure there is no duplicate call and initialization and it does not get overwritten by another async call
    // DEBT: use subscribe to know when it finished loading
    const Constructor =
      this.#dependencyGetConstructor(definition) ?? (await this.#packageLoadConstructor(definition))
    const dependency = await Constructor.construct({ platform: this })
    this.#dependencySet(definition, dependency)
  }

  async #dependencyMountModule(definition: PlatformDefinition): Promise<void> {
    if (definition.type !== 'module' && definition.module) {
      await this.moduleMount(definition.module)
    }
  }

  async #dependencyPreload(definition: PlatformDefinition): Promise<void> {
    const definitions = definition.preload ?? []
    const promises = definitions.map((def) => this.#dependencyMount(def))
    await Promise.allSettled(promises)
  }

  #dependencySet(definition: PlatformDefinition, dependency: object): void {
    if (definition.type === 'client') {
      const map = this.#clients.get(definition.name) ?? new Map()
      map.set(definition.variant ?? Symbol(), dependency)
      this.#clients.set(definition.name, map)
      return
    }
    if (definition.type === 'component') {
      this.#components.set(definition.name, dependency)
      return
    }
    if (definition.type === 'controller') {
      this.#controllers.set(definition.name, dependency)
      return
    }
    if (definition.type === 'module') {
      this.#modules.set(definition.name, dependency)
      return
    }
    if (definition.type === 'provider') {
      this.#providers.set(definition.name, dependency)
    }
  }

  // TODO: @ErrorTrace({ caller: 'platform.#moduleGet' })
  async #packageLoadConstructor(definition: PlatformDefinition): Promise<PlatformConstructor> {
    const url = definition.url ?? this.#parameters.dependencyUrlBuilder?.(definition)
    if (!R.isString(url)) {
      throw new ErrorCustom({
        code: 'lib-platform--platform--01',
        message: `not enough data to load dependency: ${definition.name}`,
        trace: {
          caller: 'platform.#packageLoadConstructor',
          context: 'platform',
          source: 'lib-platform',
        },
      })
    }
    const scriptService = await this.providerGet<ScriptService>({
      name: PlatformConstant.scriptService,
      type: 'provider',
    })
    const importedPackage = await scriptService.import({ url })
    const Constructor = importedPackage[definition.exportName ?? definition.name]
    if (!this.#constructorGuard(Constructor)) {
      throw new ErrorCustom({
        code: 'lib-platform--platform--02',
        message: `constructor for (${definition.name}) is not a valid`,
        trace: {
          caller: 'platform.#packageLoadConstructor',
          context: 'platform',
          source: 'lib-platform',
        },
      })
    }
    return Constructor
  }

  async clientGet<TClient extends object>(definition: PlatformDefinitionClient): Promise<TClient> {
    this.#dependencyPreload(definition).catch(R.doNothing())
    await this.#dependencyMountModule(definition)
    await this.#dependencyMount(definition)
    return this.#dependencyGet(definition) as TClient
  }

  clientGetMaybe<TClient extends object>(definition: PlatformDefinitionClient): TClient | undefined {
    return this.#dependencyGet(definition) as TClient
  }

  async controllerGet<TController extends object>(
    definition: PlatformDefinitionController,
  ): Promise<TController> {
    this.#dependencyPreload(definition).catch(R.doNothing())
    await this.#dependencyMountModule(definition)
    await this.#dependencyMount(definition)
    return this.#dependencyGet(definition) as TController
  }

  controllerGetMaybe<TController extends object>(
    definition: PlatformDefinitionController,
  ): TController | undefined {
    return this.#dependencyGet(definition) as TController
  }

  async moduleMount(definition: PlatformDefinitionModule): Promise<void> {
    this.#dependencyPreload(definition).catch(R.doNothing())
    await this.#dependencyMount(definition)
  }

  async moduleMountDependencies(dependencies: PlatformModuleDependencies): Promise<void> {
    const constructors = Platform.constructorMerge(
      dependencies.constructorsDefault,
      dependencies.constructors,
    )
    const definitions = this.#definitionFromConstructors(constructors)
    await Promise.allSettled(definitions.map((definition) => this.#dependencyMount(definition)))
  }

  async providerGet<TProvider extends object>(definition: PlatformDefinitionProvider): Promise<TProvider> {
    this.#dependencyPreload(definition).catch(R.doNothing())
    await this.#dependencyMountModule(definition)
    await this.#dependencyMount(definition)
    return this.#dependencyGet(definition) as TProvider
  }

  providerGetMaybe<TProvider extends object>(definition: PlatformDefinitionProvider): TProvider | undefined {
    return this.#dependencyGet(definition) as TProvider
  }
}
