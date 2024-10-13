import { ErrorCustom } from '@gnowth/lib-utils'
import * as R from 'remeda'

import { ScriptService } from '../modules/scripts'
import { PlatformDependency } from './platform.constants'
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
  #clients = new Map<string, Map<string, object>>()
  #components = new Map<string, object>()
  #constructors: PlatformConstructors
  #controllers = new Map<string, object>()
  #modules = new Map<string, object>()
  #parameters: Parameters
  #providers = new Map<string, object>()

  constructor(parameters?: Parameters) {
    this.#parameters = parameters ?? {}
    this.#constructors = parameters?.constructors ?? {}
  }

  static async construct(parameters?: Parameters): Promise<Platform> {
    const constructors = this.constructorMerge({ modules }, parameters?.constructors)
    const platform = new this({ ...parameters, constructors })
    await platform.moduleMount({ constructors, name: PlatformDependency.scriptModule })
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
    this.#constructors = Platform.constructorMerge(definition.constructors, this.#constructors)
    if (definition.type === 'client') {
      const clients = this.#constructors.clients?.[definition.name] ?? {}
      return definition.variant ? clients[definition.variant] : R.values(clients).at(0)
    }
    if (definition.type === 'component') {
      // TODO
      return this.#constructors.components?.[definition.name]
    }
    if (definition.type === 'controller') {
      return this.#constructors.controllers?.[definition.name]
    }
    if (definition.type === 'module') {
      return this.#constructors.modules?.[definition.name]
    }
    if (definition.type === 'provider') {
      return this.#constructors.providers?.[definition.name]
    }
  }

  async #dependencyMount(definition: PlatformDefinition): Promise<void> {
    if (this.#dependencyGet(definition)) {
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
      const constructors = Platform.constructorMerge(definition.constructors, definition.module.constructors)
      await this.moduleMount({ ...definition.module, constructors })
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
      name: PlatformDependency.scriptService,
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

  async clientGet<TClient extends object>(
    definitionClient: Omit<PlatformDefinitionClient, 'type'>,
  ): Promise<TClient> {
    const definition = { ...definitionClient, type: 'client' as const }
    this.#dependencyPreload(definition).catch(R.doNothing())
    await this.#dependencyMountModule(definition)
    await this.#dependencyMount(definition)
    return this.#dependencyGet(definition) as TClient
  }

  clientGetMaybe<TClient extends object>(
    definitionClient: Omit<PlatformDefinitionClient, 'type'>,
  ): TClient | undefined {
    const definition = { ...definitionClient, type: 'client' as const }
    return this.#dependencyGet(definition) as TClient
  }

  async controllerGet<TController extends object>(
    definitionController: Omit<PlatformDefinitionController, 'type'>,
  ): Promise<TController> {
    const definition = { ...definitionController, type: 'controller' as const }
    this.#dependencyPreload(definition).catch(R.doNothing())
    await this.#dependencyMountModule(definition)
    await this.#dependencyMount(definition)
    return this.#dependencyGet(definition) as TController
  }

  controllerGetMaybe<TController extends object>(
    definitionController: Omit<PlatformDefinitionController, 'type'>,
  ): TController | undefined {
    const definition = { ...definitionController, type: 'controller' as const }
    return this.#dependencyGet(definition) as TController
  }

  async dependenciesMount(definitions: PlatformDefinition[]): Promise<void> {
    await Promise.allSettled(definitions.map((definition) => this.#dependencyMount(definition)))
  }

  moduleIsMounted(definitionModule: Omit<PlatformDefinitionModule, 'type'>): boolean {
    const definition = { ...definitionModule, type: 'module' as const }
    return !!this.#dependencyGet(definition)
  }

  async moduleMount(definitionModule: Omit<PlatformDefinitionModule, 'type'>): Promise<void> {
    const definition = { ...definitionModule, type: 'module' as const }
    this.#dependencyPreload(definition).catch(R.doNothing())
    await this.#dependencyMount(definition)
  }

  async moduleMountDependencies(dependencies: PlatformModuleDependencies): Promise<void> {
    const constructors = Platform.constructorMerge(
      dependencies.constructorsDefault,
      dependencies.constructors,
    )
    const definitions = this.#definitionFromConstructors(constructors)
    await this.dependenciesMount(definitions)
  }

  async providerGet<TProvider extends object>(
    definitionProvider: Omit<PlatformDefinitionProvider, 'type'>,
  ): Promise<TProvider> {
    const definition = { ...definitionProvider, type: 'provider' as const }
    this.#dependencyPreload(definition).catch(R.doNothing())
    await this.#dependencyMountModule(definition)
    await this.#dependencyMount(definition)
    return this.#dependencyGet(definition) as TProvider
  }

  providerGetMaybe<TProvider extends object>(
    definitionProvider: Omit<PlatformDefinitionProvider, 'type'>,
  ): TProvider | undefined {
    const definition = { ...definitionProvider, type: 'provider' as const }
    return this.#dependencyGet(definition) as TProvider
  }
}
