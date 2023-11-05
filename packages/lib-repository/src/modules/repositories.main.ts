import { EventService } from './events'
import { MfeManager } from './mfes'
import { TokenServices } from './repositories.tokens'
import { ResourceManager } from './resources'
import { ServiceManager } from './services.managers'

export class Repository {
  #mfeManager: MfeManager
  #resourceManager: ResourceManager
  #serviceManager: ServiceManager

  constructor() {
    this.#mfeManager = new MfeManager()
    this.#resourceManager = new ResourceManager()
    this.#serviceManager = new ServiceManager({ repository: this })
  }

  async initialize(): Promise<void> {
    // TODO: check how Repository itsef could use some services, like configs, events, dependencies etc... and pass down to managers
    const eventService = new EventService({ repository: this })
    this.#serviceManager.add(TokenServices.events, eventService)
  }

  serviceGet(name: TokenServices.events): EventService
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
