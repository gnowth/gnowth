import { PlatformConstant, PlatformParameters } from '../core/platform'
import { ErrorStream1 } from './errors.streams'

export class ErrorModule {
  static async construct(parameters: PlatformParameters): Promise<ErrorModule> {
    await parameters.platform.moduleMountDependencies({
      constructors: parameters.constructors,
      constructorsDefault: { providers: { [PlatformConstant.errorStream]: ErrorStream1 } },
    })
    return new this()
  }
}
