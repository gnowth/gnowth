import { PlatformDependency, PlatformParameters } from '../core/platform'
import { I18nClientV23 } from './i18n.clients'
import { I18nController } from './i18n.controllers'
import { I18nService } from './i18n.services'

export class I18nModule {
  static async construct(parameters: PlatformParameters): Promise<I18nModule> {
    await parameters.platform.moduleMount({ name: PlatformDependency.errorModule })
    await parameters.platform.moduleMountDependencies({
      constructors: parameters.constructors,
      constructorsDefault: {
        clients: {
          [PlatformDependency.i18nClient]: {
            [PlatformDependency.i18nClientVariant.i18nClientV23]: I18nClientV23,
          },
        },
        controllers: { [PlatformDependency.i18nController]: I18nController },
        providers: { [PlatformDependency.i18nService]: I18nService },
      },
    })
    return new this()
  }
}
