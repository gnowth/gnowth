import { PlatformConstant, PlatformParameters } from '../core/platform'
import { ErrorStream } from './errors.streams'
import { I18nInterfaceClientV1 } from './i18n.types'

export class I18nController {
  static async construct(parameters: PlatformParameters): Promise<I18nController> {
    const errorStream = await parameters.platform.providerGet<ErrorStream>({
      name: PlatformConstant.errorStream,
      type: 'provider',
    })
    const i18nClient = await parameters.platform.clientGet<I18nInterfaceClientV1>({
      name: PlatformConstant.i18nClient,
      type: 'client',
      variant: PlatformConstant.i18nClientVariant.i18nClientV23,
    })

    i18nClient.errorOut$.subscribe(errorStream.errorIn$)

    return new this()
  }

  // DEBT(investigation): react to create/get client instance from here?
}
