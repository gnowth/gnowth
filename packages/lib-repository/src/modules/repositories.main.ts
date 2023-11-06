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

    // TODO: move to initialise method later on
    const eventService = new EventService({ repository: this })
    this.#serviceManager.add(TokenServices.events, eventService)
  }

  async initialise(): Promise<void> {
    return undefined
    // TODO: check how Repository itsef could use some services, like configs, events, dependencies etc... and pass down to managers
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
