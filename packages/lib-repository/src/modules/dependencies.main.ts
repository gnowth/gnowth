import { ErrorCustom } from '@gnowth/lib-utils'

import type { Dependency } from './dependencies.bases'
import type {
  DependencyDefinition,
  DependencyDefinitionService,
  DependencyRecord,
} from './dependencies.types'
import type { ScriptMain } from './scripts.main'

type Parameters = {
  dependencies?: DependencyRecord
  scriptMain: ScriptMain
}

export class DependencyMain {
  #dependencies?: Required<DependencyRecord>
  #scriptMain: ScriptMain

  constructor(parameters: Parameters) {
    this.#dependencies = {
      mfes: parameters.dependencies?.mfes ?? {},
      resources: parameters.dependencies?.resources ?? {},
      services: parameters.dependencies?.services ?? {},
      streams: parameters.dependencies?.streams ?? {},
    }
    this.#scriptMain = parameters.scriptMain
  }

  async getAsync(definition: DependencyDefinition): Promise<{ new (): Dependency }> {
    if (this.#guardDefinitionService(definition)) {
      if (definition.Constructor) {
        return definition.Constructor
      }
    }

    // TODO: check this.#dependencies first

    // TODO: compute url from default url generator (from configs service)
    // base on env and dependency, base url
    // maybe at service layer?

    if (definition.url) {
      return this.load(definition)
    }

    throw new ErrorCustom({
      code: 'lib-repository--dependencies--01',
      message: `not enough data to load dependency: ${definition.name} [${definition.type}]`,
      trace: {
        caller: 'dependencyService.get',
        context: 'dependencies',
        source: 'lib-repository',
      },
    })
  }

  async load(definition: DependencyDefinition): Promise<{ new (): Dependency }> {
    if (!definition.url) {
      throw new ErrorCustom({
        code: 'lib-repository--dependencies--02',
        message: `not enough data to load dependency: ${definition.name} [${definition.type}]`,
        trace: {
          caller: 'dependencyService.load',
          context: 'dependencies',
          source: 'lib-repository',
        },
      })
    }

    await this.#scriptMain.inject({ url: definition.url })
    const module = await import(definition.url)

    // TODO: might need an export name
    // TODO: make sure service is not getting overridden due to async call
    // TODO: load dependencies
    // catch any errors?
    return module[definition.name]
  }

  #guardDefinitionService(definition: DependencyDefinition): definition is DependencyDefinitionService {
    return definition.type === 'service'
  }
}
