import type { PlatformParameters } from '../core/platform'

import { PlatformConstant } from '../core/platform.constants'
import { ScriptService } from './scripts.services'

export class ScriptModule {
  static async construct(parameters: PlatformParameters): Promise<ScriptModule> {
    await parameters.platform.moduleMountDependencies({
      constructors: parameters.constructors,
      constructorsDefault: { providers: { [PlatformConstant.scriptService]: ScriptService } },
    })
    return new this()
  }
}
