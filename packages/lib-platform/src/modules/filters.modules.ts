import { PlatformDependency, PlatformParameters } from '../core/platform'
import { FilterModel } from './filters.models'

export class FilterModule {
  static async construct(parameters: PlatformParameters): Promise<FilterModule> {
    await parameters.platform.moduleMountDependencies({
      constructors: parameters.constructors,
      constructorsDefault: { providers: { [PlatformDependency.filterModel]: FilterModel } },
    })
    return new this()
  }
}
