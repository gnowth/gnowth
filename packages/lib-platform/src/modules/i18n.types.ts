import { i18n } from 'i18next'
import { Observable } from 'rxjs'

import { ErrorData } from './errors'

export interface I18nInterfaceClientV1 {
  readonly client: i18n
  readonly errorOut$: Observable<ErrorData>
  readonly version: 'v1.0'
}
