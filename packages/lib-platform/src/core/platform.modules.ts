import { AuthenticationModule } from '../modules/authentications'
import { DataModule } from '../modules/data'
import { ErrorModule } from '../modules/errors'
import { EventModule } from '../modules/events'
import { FilterModule } from '../modules/filters'
import { I18nModule } from '../modules/i18n'
import { NotificationModule } from '../modules/notifications'
import { QueryModule } from '../modules/queries'
import { ScriptModule } from '../modules/scripts'
import { PlatformDependency } from './platform.constants'

export const modules = {
  [PlatformDependency.authenticationModule]: AuthenticationModule,
  [PlatformDependency.dataModule]: DataModule,
  [PlatformDependency.errorModule]: ErrorModule,
  [PlatformDependency.eventModule]: EventModule,
  [PlatformDependency.filterModule]: FilterModule,
  [PlatformDependency.i18nModule]: I18nModule,
  [PlatformDependency.notificationModule]: NotificationModule,
  [PlatformDependency.queryModule]: QueryModule,
  [PlatformDependency.scriptModule]: ScriptModule,
}
