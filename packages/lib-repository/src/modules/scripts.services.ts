import { EventService } from './events.exports'
import { RepositoryService } from './repositories.modules'
import { TokenService } from './repositories.tokens'
import { scriptImport, scriptInject } from './scripts.utils'

type ScriptParameters = {
  async?: boolean
  container?: HTMLElement
  defer?: boolean
  preload?: boolean
  url: string
}

export class ScriptService extends RepositoryService {
  #eventService!: EventService

  async import(parameters: ScriptParameters) {
    return scriptImport(parameters)
  }

  async inject(parameters: ScriptParameters): Promise<Event> {
    return scriptInject(parameters)
  }

  async onInit(): Promise<void> {
    this.#eventService = await this.repository.serviceGet<EventService>({ name: TokenService.event })
  }
}
