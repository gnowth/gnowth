import type { PlatformParameters } from '../core/platform'

import { PlatformConstant } from '../core/platform.constants'
import { AuthenticationClient } from './authentications.clients'
import { AuthenticationController } from './authentications.controllers'
import { AuthenticationService } from './authentications.services'
import { AuthenticationStream } from './authentications.streams'

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
          [PlatformConstant.authenticationService]: AuthenticationService,
          [PlatformConstant.authenticationStream]: AuthenticationStream,
        },
      },
    })
    return new this()
  }
}
