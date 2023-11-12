import { ErrorCustom } from '@gnowth/lib-utils'

import type { Dependency, DependencyDefinitionService } from './dependencies'
import type { DependencyMain } from './dependencies.main'
import { Service } from './services.bases'

type Parameters = { dependencyMain: DependencyMain }

export class ServiceManager {
  #dependencyMain: DependencyMain
  #services: Map<string, Service> = new Map()

  constructor(parameters: Parameters) {
    this.#dependencyMain = parameters.dependencyMain
  }

  async addAsync(dependency: DependencyDefinitionService): Promise<void> {
    const Constructor = await this.#dependencyMain.getAsync(dependency)

    const service = new Constructor()

    if (!this.#guard(service)) {
      throw new ErrorCustom({
        code: 'lib-repository--services--01',
        message: `dependency (${dependency.name}) is not of type ${dependency.type}`,
        trace: {
          caller: 'serviceManager.load',
          context: 'services',
          source: 'lib-repository',
        },
      })
    }

    // TODO: add dependencies and call onInit

    this.#services.set(dependency.name, service)
  }

  get<ServiceType>(name: string): ServiceType | undefined {
    return this.#services.get(name) as ServiceType
  }

  async getAsync<ServiceType>(dependency: DependencyDefinitionService): Promise<ServiceType> {
    const service = this.get<ServiceType>(dependency.name)

    if (service) {
      return service
    }

    await this.addAsync(dependency)
    const serviceLoaded = this.get(dependency.name) as ServiceType

    // TODO: throw error if service is not loaded

    return serviceLoaded
  }

  #guard(dependency: Dependency): dependency is Service {
    return dependency instanceof Service
  }
}
