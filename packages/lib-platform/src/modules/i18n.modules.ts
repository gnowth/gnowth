import { PlatformConstant, PlatformParameters } from '../core/platform'
import { I18nClientV23 } from './i18n.clients'
import { I18nController } from './i18n.controllers'
import { I18nService } from './i18n.services'

export class I18nModule {
  static async construct(parameters: PlatformParameters): Promise<I18nModule> {
    await parameters.platform.moduleMount({ name: PlatformConstant.errorModule, type: 'module' })
    await parameters.platform.moduleMountDependencies({
      constructors: parameters.constructors,
      constructorsDefault: {
        clients: {
          [PlatformConstant.i18nClient]: {
            [PlatformConstant.i18nClientVariant.i18nClientV23]: I18nClientV23,
          },
        },
        controllers: { [PlatformConstant.i18nController]: I18nController },
        providers: { [PlatformConstant.i18nService]: I18nService },
      },
    })
    return new this()
  }
}
