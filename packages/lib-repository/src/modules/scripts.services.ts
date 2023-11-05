import type { ParametersScript } from './scripts.main'
import { TokenServices } from './repositories.tokens'
import { Script } from './scripts.main'
import { Service } from './services.main'

export class ScriptService extends Service {
  #script!: Script
  #eventRegistry!: string

  async onInit(): Promise<void> {
    this.#script = new Script()
    const eventService = this.repository.serviceGet(TokenServices.events)
    this.#eventRegistry = eventService.register()
  }

  inject(parameters: ParametersScript): Promise<Event> {
    return this.#script.inject(parameters)
  }
}
