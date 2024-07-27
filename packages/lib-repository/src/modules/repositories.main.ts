import type { DependencyRecord } from './dependencies'
import type { LocaleService } from './locales'
import { DependencyMain } from './dependencies.main'
import { EventService } from './events'
import { MfeManager } from './mfes'
import { TokenServices } from './repositories.tokens'
import { ResourceManager } from './resources'
import { ServiceManager } from './services.managers'
import { ScriptMain } from './scripts.main'

export class Repository {
  #mfeManager: MfeManager
  #resourceManager: ResourceManager
  #serviceManager: ServiceManager

  constructor(parameters?: { dependencies?: DependencyRecord }) {
    const scriptMain = new ScriptMain()
    const dependencyMain = new DependencyMain({ dependencies: parameters?.dependencies, scriptMain })

    this.#mfeManager = new MfeManager()
    this.#resourceManager = new ResourceManager({ dependencyMain })
    this.#serviceManager = new ServiceManager({ dependencyMain })
  }

  async initialise(): Promise<void> {
    this.#serviceManager.addAsync({ Constructor: EventService, name: TokenServices.events, type: 'service' })

    // TODO: check how Repository itsef could use some services, like configs, events, dependencies etc... and pass down to managers
  }

  serviceGet(name: TokenServices.events): EventService
  serviceGet(name: TokenServices.locales): LocaleService
  serviceGet<Service>(name: string): Service | undefined
  serviceGet<Service>(name: string): Service | undefined {
    return this.#serviceManager.get(name) as Service
  }

  async serviceGetAsync<Service>(parameters: Parameters<ServiceManager['getAsync']>[0]): Promise<Service> {
    return this.#serviceManager.getAsync(parameters)
  }

  async serviceLoad(): Promise<void> {
    return undefined
  }
}
