import { PlatformConstant, PlatformParameters } from '@gnowth/lib-platform'

import { LogicUserConstant } from '../module.constants'
import { UserModel } from './users.models'
import { UserService } from './users.services'

export class UserModule {
  static async construct(parameters: PlatformParameters): Promise<UserModule> {
    await parameters.platform.moduleMount({ name: PlatformConstant.errorModule, type: 'module' })
    await parameters.platform.moduleMountDependencies({
      constructors: parameters.constructors,
      constructorsDefault: {
        providers: {
          [LogicUserConstant.userModel]: UserModel,
          [LogicUserConstant.userService]: UserService,
        },
      },
    })
    return new this()
  }
}
