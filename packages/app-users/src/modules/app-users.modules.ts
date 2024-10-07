import { PlatformParameters } from '@gnowth/lib-react'

import { AppUserDependency } from './app-users'
import { AppUserController } from './app-users.controllers'

export class AppUserModule {
  static async construct(parameters: PlatformParameters): Promise<AppUserModule> {
    await parameters.platform.moduleMountDependencies({
      constructors: parameters.constructors,
      constructorsDefault: { controllers: { [AppUserDependency.appUserController]: AppUserController } },
    })
    return new this()
  }
}
