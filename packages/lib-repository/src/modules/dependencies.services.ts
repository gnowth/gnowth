import { ErrorCustom } from '@gnowth/lib-utils'

import type { DependencyConstructor, DependencyType, DependencyTypeService } from './dependencies.types'
import type { Script } from './scripts.main'

export class DependencyService {
  // TODO fix non nullable
  #script!: Script

  async getAsync(dependency: DependencyType): Promise<DependencyConstructor> {
    if (this.guardDependencyTypeService(dependency)) {
      if (dependency.service) {
        return dependency.service
      }
    }

    // TODO: compute url from default url generator (from configs service)
    // base on env and dependency, base url

    if (dependency.url) {
      return this.load(dependency)
    }

    throw new ErrorCustom({
      code: 'lib-repository--dependencies--01',
      message: `not enough data to load dependency: ${dependency.name} [${dependency.type}]`,
      trace: {
        caller: 'dependencyService.get',
        context: 'dependencies',
        source: 'lib-repository',
      },
    })
  }

  async load(dependency: DependencyType): Promise<DependencyConstructor> {
    if (!dependency.url) {
      throw new ErrorCustom({
        code: 'lib-repository--dependencies--02',
        message: `not enough data to load dependency: ${dependency.name} [${dependency.type}]`,
        trace: {
          caller: 'dependencyService.load',
          context: 'dependencies',
          source: 'lib-repository',
        },
      })
    }

    await this.#script.inject({ url: dependency.url })
    const module = await import(dependency.url)

    // TODO: might need an export name
    // TODO: make sure service is not getting overridden due to async call
    // TODO: load dependencies
    // catch any errors?
    return module[dependency.name]
  }

  guardDependencyTypeService(dependency: DependencyType): dependency is DependencyTypeService {
    return dependency.type === 'service'
  }
}
