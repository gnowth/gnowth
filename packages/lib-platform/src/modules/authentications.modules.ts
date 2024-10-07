import { PlatformDependency, PlatformParameters } from '../core/platform'
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
          [PlatformDependency.authenticationClient]: {
            [PlatformDependency.authenticationClientVariant.client]: AuthenticationClient,
          },
        },
        controllers: { [PlatformDependency.authenticationController]: AuthenticationController },
        providers: {
          [PlatformDependency.authenticationService]: AuthenticationService,
          [PlatformDependency.authenticationStream]: AuthenticationStream,
        },
      },
    })
    return new this()
  }
}
