import type { ParametersScript } from './scripts.main'
import { TokenServices } from './repositories.tokens'
import { ScriptMain } from './scripts.main'
import { Service } from './services'
import { repositoryGetAsync } from './repositories.utils'

export class ScriptService extends Service {
  #script: ScriptMain
  #eventRegistry!: string

  constructor() {
    super()
    this.#script = new ScriptMain()
  }

  async onInit(): Promise<void> {
    const repository = await repositoryGetAsync()
    const eventService = repository.serviceGet(TokenServices.events)
    this.#eventRegistry = eventService.register()
  }

  inject(parameters: ParametersScript): Promise<Event> {
    return this.#script.inject(parameters)
  }
}
