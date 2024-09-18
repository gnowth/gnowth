import { PlatformConstant, PlatformParameters } from '../core/platform'
import { LocaleService } from './locales.services'

export class LocaleModule {
  static async construct(parameters: PlatformParameters): Promise<LocaleModule> {
    await parameters.platform.moduleMount({ name: PlatformConstant.errorModule, type: 'module' })
    await parameters.platform.moduleMountDependencies({
      constructors: parameters.constructors,
      constructorsDefault: { providers: { [PlatformConstant.localeService]: LocaleService } },
    })
    return new this()
  }
}
