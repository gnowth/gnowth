import { ErrorCustom } from '@gnowth/lib-utils'

import type { DependencyRecord, RepositoryModuleDefinition } from './repositories.types'

import { AuthenticationService } from '../modules/authentications'
import { ConfigService } from '../modules/configs'
import { DataService } from '../modules/data'
import { EventEmitterService } from '../modules/event-emitters'
import { EventService } from '../modules/events'
import { LocaleService } from '../modules/locales'
import { ScriptService } from '../modules/scripts'
import {
  RepositoryMFE,
  RepositoryModule,
  RepositoryResource,
  RepositoryService,
  RepositoryStream,
} from './repositories.modules'
import { TokenService } from './repositories.tokens'

type Parameters = {
  dependencies?: DependencyRecord
}

// add support for multiple resource bundle together

export class Repository {
  #moduleMFEs: Map<string, RepositoryMFE> = new Map()
  #moduleResources: Map<string, RepositoryResource> = new Map()
  #moduleServices: Map<string, RepositoryService> = new Map()
  #moduleStreams: Map<string, RepositoryStream> = new Map()
  #parameters: Parameters

  constructor(parameters?: Parameters) {
    this.#parameters = parameters ?? {}
  }

  static async create(parameters?: Parameters): Promise<Repository> {
    const instance = new Repository(parameters)
    await instance.initialise()
    return instance
  }

  #guardService(module: RepositoryModule): module is RepositoryService {
    return module instanceof RepositoryService
  }

  async initialise(): Promise<void> {
    // Note order matters due to dependencies
    await this.serviceGet({ Constructor: EventEmitterService, name: TokenService.eventEmitter })
    await this.serviceGet({ Constructor: EventService, name: TokenService.event })
    await this.serviceGet({ Constructor: ScriptService, name: TokenService.script })
    await this.serviceGet({ Constructor: DataService, name: TokenService.data })
    await this.serviceGet({ Constructor: ConfigService, name: TokenService.config })
    await this.serviceGet({ Constructor: AuthenticationService, name: TokenService.authentication })
    await this.serviceGet({ Constructor: LocaleService, name: TokenService.locale })

    // TODO: check how Repository itsef could use some services, like configs, events, dependencies etc... and pass down to managers
  }

  async mfeGet(definition: RepositoryModuleDefinition) {
    return this.#moduleMFEs.get(definition.name)
  }

  async moduleGet(definition: RepositoryModuleDefinition) {
    // TODO: compute url from default url generator (from configs service)
    // base on env and dependency, base url
    // maybe at service layer?
    if (!definition.url) {
      throw new ErrorCustom({
        code: 'lib-repository--repositories--01',
        message: `not enough data to load dependency: ${definition.name}`,
        trace: {
          caller: 'repository.moduleGet',
          context: 'repositories',
          source: 'lib-repository',
        },
      })
    }

    const scriptService = await this.serviceGet<ScriptService>({ name: TokenService.script })

    // add preload if needed
    return scriptService.import({ url: definition.url })
  }

  async resourceGet(definition: RepositoryModuleDefinition) {
    return this.#moduleResources.get(definition.name)
  }
  async serviceGet<Service>(definition: RepositoryModuleDefinition): Promise<Service> {
    if (this.#moduleServices.get(definition.name)) {
      return this.#moduleServices.get(definition.name) as Service
    }

    // TODO check name from map passed in initialization

    // Need to document that named export need to match module name
    // there can be multiple module in a bundle
    const Constructor =
      definition.Constructor ??
      ((await this.moduleGet(definition))[definition.name] as typeof RepositoryModule)
    // need to make sure there is no duplicate call and initialization and it does not get overwritten by another async call
    // check if constructor has requirement
    // get dependencies
    // load dependencies from service
    // initialize dependencies

    const service = await Constructor.construct({ repository: this })
    if (!this.#guardService(service)) {
      throw new ErrorCustom({
        code: 'lib-repository--repositories--02',
        message: `module (${definition.name}) is not of type service`,
        trace: {
          caller: 'repository.serviceGet',
          context: 'repositories',
          source: 'lib-repository',
        },
      })
    }

    this.#moduleServices.set(definition.name, service)
    return service as Service
  }

  async streamGet(definition: RepositoryModuleDefinition) {
    return this.#moduleStreams.get(definition.name)
  }
}
