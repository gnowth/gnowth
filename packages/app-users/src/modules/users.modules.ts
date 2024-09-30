import { PlatformConstant, PlatformParameters } from '@gnowth/lib-react'

import { ModuleUserConstant } from './module-users'
import { UserModel } from './users.models'
import { UserService } from './users.services'

export class UserModule {
  static async construct(parameters: PlatformParameters): Promise<UserModule> {
    await parameters.platform.moduleMount({ name: PlatformConstant.errorModule, type: 'module' })
    await parameters.platform.moduleMountDependencies({
      constructors: parameters.constructors,
      constructorsDefault: {
        providers: {
          [ModuleUserConstant.userModel]: UserModel,
          [ModuleUserConstant.userService]: UserService,
        },
      },
    })
    return new this()
  }
}
