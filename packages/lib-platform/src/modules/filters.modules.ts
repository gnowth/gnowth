import { PlatformConstant, PlatformParameters } from '../core/platform'
import { FilterModel } from './filters.models'

export class FilterModule {
  static async construct(parameters: PlatformParameters): Promise<FilterModule> {
    await parameters.platform.moduleMountDependencies({
      constructors: parameters.constructors,
      constructorsDefault: { providers: { [PlatformConstant.filterModel]: FilterModel } },
    })
    return new this()
  }
}
