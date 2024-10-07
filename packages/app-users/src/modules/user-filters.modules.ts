import { PlatformParameters } from '@gnowth/lib-react'

import { AppUserDependency } from './app-users'
import { UserFilterModel } from './user-filters.models'

export class UserFilterModule {
  static async construct(parameters: PlatformParameters): Promise<UserFilterModule> {
    await parameters.platform.moduleMountDependencies({
      constructors: parameters.constructors,
      constructorsDefault: { providers: { [AppUserDependency.userFilterModel]: UserFilterModel } },
    })
    return new this()
  }
}
