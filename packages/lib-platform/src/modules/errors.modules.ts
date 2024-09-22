import { PlatformConstant, PlatformParameters } from '../core/platform'
import { ErrorStream } from './errors.streams'

export class ErrorModule {
  static async construct(parameters: PlatformParameters): Promise<ErrorModule> {
    await parameters.platform.moduleMountDependencies({
      constructors: parameters.constructors,
      constructorsDefault: { providers: { [PlatformConstant.errorStream]: ErrorStream } },
    })
    return new this()
  }
}
