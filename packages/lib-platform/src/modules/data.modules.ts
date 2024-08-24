import type { PlatformParameters } from '../core/platform'

import { PlatformConstant } from '../core/platform.constants'
import { DataService } from './data.services'

export class DataModule {
  static async construct(parameters: PlatformParameters): Promise<DataModule> {
    await parameters.platform.moduleMountDependencies({
      constructors: parameters.constructors,
      constructorsDefault: { providers: { [PlatformConstant.dataService]: DataService } },
    })
    return new this()
  }
}
