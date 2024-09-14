import { AuthenticationModule } from '../modules/authentications'
import { DataModule } from '../modules/data'
import { ErrorModule } from '../modules/errors.modules'
import { EventModule } from '../modules/events'
import { LocaleModule } from '../modules/locales'
import { ScriptModule } from '../modules/scripts'
import { PlatformConstant } from './platform.constants'

export const modules = {
  [PlatformConstant.authenticationModule]: AuthenticationModule,
  [PlatformConstant.dataModule]: DataModule,
  [PlatformConstant.errorModule]: ErrorModule,
  [PlatformConstant.eventModule]: EventModule,
  [PlatformConstant.localeModule]: LocaleModule,
  [PlatformConstant.scriptModule]: ScriptModule,
}
