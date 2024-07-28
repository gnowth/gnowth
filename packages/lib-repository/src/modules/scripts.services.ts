import type { Repository } from './repositories.main'
import { TokenServices } from './repositories.tokens'
import { RepositoryService } from './repositories.modules'
import { EventService } from './events.services'
import { scriptImport, scriptInject } from './scripts.utils'

type ScriptParameters = {
  async?: boolean
  container?: HTMLElement
  defer?: boolean
  preload?: boolean
  url: string
}

export class ScriptService extends RepositoryService {
  #eventRegistry!: string

  async onInit(repository: Repository): Promise<void> {
    const eventService = await repository.serviceGet<EventService>({ name: TokenServices.events })
    this.#eventRegistry = eventService.register()
  }

  async import(parameters: ScriptParameters) {
    return scriptImport(parameters)
  }

  async inject(parameters: ScriptParameters): Promise<Event> {
    return scriptInject(parameters)
  }
}
