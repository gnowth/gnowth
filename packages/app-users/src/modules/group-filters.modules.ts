import { PlatformParameters } from '@gnowth/lib-react'

import { AppUserDependency } from './app-users'
import { GroupFilterModel } from './group-filters.models'

export class GroupFilterModule {
  static async construct(parameters: PlatformParameters): Promise<GroupFilterModule> {
    await parameters.platform.moduleMountDependencies({
      constructors: parameters.constructors,
      constructorsDefault: { providers: { [AppUserDependency.groupFilterModel]: GroupFilterModel } },
    })
    return new this()
  }
}
