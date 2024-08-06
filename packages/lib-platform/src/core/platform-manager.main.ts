import { ErrorCustom } from '@gnowth/lib-utils'
import * as R from 'remeda'

import type { Platform } from './platform.main'
import type { PlatformModule } from './platform-module.main'
import type { PlatformModuleDefinition } from './platform-module.types'

import { scriptImport } from '../modules/scripts.utils'

type GlobalThis = {
  platform?: Platform
} & typeof globalThis

type Parameters = {
  Constructor?: typeof Platform
  moduleUrlBuilder?: (definition: PlatformModuleDefinition) => string
  modules?: Record<string, typeof PlatformModule>
  url?: string
}

export class PlatformManager {
  static #global: GlobalThis = globalThis

  static async get(parameters?: Parameters): Promise<Platform> {
    await this.#mount(parameters)
    return this.#global.platform as Platform
  }

  static unmount(): void {
    delete this.#global.platform
  }

  static async #load(parameters?: Parameters): Promise<typeof Platform> {
    const url = parameters?.url
    if (!R.isString(url)) {
      throw new ErrorCustom({
        code: 'lib-platform--platform-manager--01',
        message: 'not enough data to load platform',
        trace: {
          caller: 'platformManager.#load',
          context: 'platformManager',
          source: 'lib-platform',
        },
      })
    }
    const module = await scriptImport({ async: true, url })
    return module.Platform as typeof Platform
  }

  static async #mount(parameters?: Parameters) {
    if (this.#global.platform) {
      return
    }
    const Constructor = parameters?.Constructor ?? (await this.#load(parameters))
    const platform = await Constructor.construct(parameters)
    this.#global.platform = platform
  }
}
