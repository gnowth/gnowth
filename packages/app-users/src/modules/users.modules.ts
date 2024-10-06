import { PlatformDependency, PlatformParameters } from '@gnowth/lib-react'

import { AppUserDependency } from './app-users'
import { UserModel } from './users.models'
import { UserService } from './users.services'

export class UserModule {
  static async construct(parameters: PlatformParameters): Promise<UserModule> {
    await parameters.platform.moduleMount({ name: PlatformDependency.errorModule })
    await parameters.platform.moduleMountDependencies({
      constructors: parameters.constructors,
      constructorsDefault: {
        providers: {
          [AppUserDependency.userModel]: UserModel,
          [AppUserDependency.userService]: UserService,
        },
      },
    })
    return new this()
  }
}
