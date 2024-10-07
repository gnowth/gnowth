import { PlatformDependency, PlatformParameters } from '../core/platform'
import { ErrorModel } from './errors.models'
import { ErrorStream } from './errors.streams'

export class ErrorModule {
  static async construct(parameters: PlatformParameters): Promise<ErrorModule> {
    await parameters.platform.moduleMountDependencies({
      constructors: parameters.constructors,
      constructorsDefault: {
        providers: {
          [PlatformDependency.errorModel]: ErrorModel,
          [PlatformDependency.errorStream]: ErrorStream,
        },
      },
    })
    return new this()
  }
}
