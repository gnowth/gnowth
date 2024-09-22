import { AuthenticationModule } from '../modules/authentications'
import { DataModule } from '../modules/data'
import { ErrorModule } from '../modules/errors'
import { EventModule } from '../modules/events'
import { I18nModule } from '../modules/i18n'
import { QueryModule } from '../modules/queries'
import { ScriptModule } from '../modules/scripts'
import { PlatformConstant } from './platform.constants'

export const modules = {
  [PlatformConstant.authenticationModule]: AuthenticationModule,
  [PlatformConstant.dataModule]: DataModule,
  [PlatformConstant.errorModule]: ErrorModule,
  [PlatformConstant.eventModule]: EventModule,
  [PlatformConstant.i18nModule]: I18nModule,
  [PlatformConstant.queryModule]: QueryModule,
  [PlatformConstant.scriptModule]: ScriptModule,
}
