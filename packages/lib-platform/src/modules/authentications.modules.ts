import type { PlatformParameters } from '../core/platform'

import { PlatformConstant } from '../core/platform.constants'
import { AuthenticationClient } from './authentications.clients'
import { AuthenticationController } from './authentications.controllers'
import { AuthenticationObservable } from './authentications.observables'
import { AuthenticationService } from './authentications.services'

export class AuthenticationModule {
  static async construct(parameters: PlatformParameters): Promise<AuthenticationModule> {
    await parameters.platform.moduleMountDependencies({
      constructors: parameters.constructors,
      constructorsDefault: {
        clients: {
          [PlatformConstant.authenticationClient]: {
            [PlatformConstant.authenticationClientVariant.client]: AuthenticationClient,
          },
        },
        controllers: { [PlatformConstant.authenticationController]: AuthenticationController },
        providers: {
          [PlatformConstant.authenticationObservable]: AuthenticationObservable,
          [PlatformConstant.authenticationService]: AuthenticationService,
        },
      },
    })
    return new this()
  }
}
