import { ErrorCustom } from '@gnowth/lib-utils'

import type { DependencyService } from './dependencies.services'
import type { DependencyTypeService } from './dependencies.types'
import type { Repository } from './repositories'
import { Service } from './services.main'

type Parameters = { repository: Repository }

export class ServiceManager {
  // TODO fix non nullable
  #dependencyService!: DependencyService
  #parameters: Parameters
  #repository: Repository
  #services: Map<string, Service> = new Map()

  constructor(parameters: Parameters) {
    this.#parameters = parameters
    this.#repository = parameters.repository
  }

  add(name: string, service: Service): void {
    this.#services.set(name, service)
  }

  async addAsync(dependency: DependencyTypeService): Promise<void> {
    const Constructor = await this.#dependencyService.getAsync(dependency)

    const instance = new Constructor({ repository: this.#repository })

    if (!(instance instanceof Service)) {
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

    this.add(dependency.name, instance)
  }

  get<ServiceType>(name: string): ServiceType | undefined {
    return this.#services.get(name) as ServiceType
  }

  async getAsync<ServiceType>(dependency: DependencyTypeService): Promise<ServiceType> {
    const service = this.get<ServiceType>(dependency.name)

    if (service) {
      return service
    }

    await this.addAsync(dependency)
    const serviceLoaded = this.get(dependency.name) as ServiceType

    // TODO: throw error if service is not loaded

    return serviceLoaded
  }
}
