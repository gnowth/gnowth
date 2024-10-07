import { PlatformDependency, PlatformParameters } from '../core/platform'
import { ScriptService } from './scripts.services'

export class ScriptModule {
  static async construct(parameters: PlatformParameters): Promise<ScriptModule> {
    await parameters.platform.moduleMountDependencies({
      constructors: parameters.constructors,
      constructorsDefault: { providers: { [PlatformDependency.scriptService]: ScriptService } },
    })
    return new this()
  }
}
