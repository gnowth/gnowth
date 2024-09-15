import type { PlatformParameters } from '../core/platform'

import { scriptImport, scriptInject } from './scripts.utils'

type ScriptParameters = {
  async?: boolean
  container?: HTMLElement
  defer?: boolean
  preload?: boolean
  url: string
}

export class ScriptService {
  static async construct(_parameters: PlatformParameters): Promise<ScriptService> {
    return new this()
  }

  async import(parameters: ScriptParameters) {
    return scriptImport(parameters)
  }

  async inject(parameters: ScriptParameters): Promise<Event> {
    return scriptInject(parameters)
  }
}
