import type { Platform } from '../core/platform.main'
import type { EventService } from './events'

import { PlatformService } from '../core/platform.modules'
import { TokenService } from '../core/platform.tokens'
import { scriptImport, scriptInject } from './scripts.utils'

type ScriptParameters = {
  async?: boolean
  container?: HTMLElement
  defer?: boolean
  preload?: boolean
  url: string
}

type Dependencies = {
  eventService: EventService
}

type ConstructParameters = {
  platform: Platform
}

type Parameters = {
  dependencies: Dependencies
  platform: Platform
}

export class ScriptService extends PlatformService {
  #dependencies: Dependencies

  constructor(parameters: Parameters) {
    super(parameters)
    this.#dependencies = parameters.dependencies
  }

  static async construct(parameters: ConstructParameters): Promise<ScriptService> {
    const eventService = await parameters.platform.serviceGet<EventService>({ name: TokenService.event })
    return new this({ dependencies: { eventService }, platform: parameters.platform })
  }

  async import(parameters: ScriptParameters) {
    return scriptImport(parameters)
  }

  async inject(parameters: ScriptParameters): Promise<Event> {
    return scriptInject(parameters)
  }
}
