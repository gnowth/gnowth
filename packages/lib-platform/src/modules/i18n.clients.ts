import { createInstance, i18n } from 'i18next'
import i18nLanguageDetector from 'i18next-browser-languagedetector'
import i18nBackend from 'i18next-http-backend'
import * as R from 'remeda'
import { Observable, Subject } from 'rxjs'

import { PlatformDependency, PlatformParameters } from '../core/platform'
import { ErrorData, ErrorModel } from './errors'
import { I18nInterfaceClientV1 } from './i18n.types'

type Parameters = { client: i18n; errorOut$: Observable<ErrorData> } & PlatformParameters
export class I18nClientV23 implements I18nInterfaceClientV1 {
  readonly client: i18n
  readonly errorOut$: Observable<ErrorData>
  readonly version = 'v1.0'

  constructor(parameters: Parameters) {
    this.client = parameters.client
    this.errorOut$ = parameters.errorOut$
  }

  static async construct(parameters: PlatformParameters): Promise<I18nClientV23> {
    const errorOut$ = new Subject<ErrorData>()
    const errorModel = await parameters.platform.providerGet<ErrorModel>({
      name: PlatformDependency.errorModel,
    })
    const client = createInstance()
    client
      .use(i18nBackend) // load translation using http. docs: https://github.com/i18next/i18next-http-backend
      .use(i18nLanguageDetector) // detect user language. docs: https://github.com/i18next/i18next-browser-languageDetector
      .init({ debug: false, fallbackLng: 'en' }) // for all options docs: https://www.i18next.com/overview/configuration-options
      .catch((error) =>
        R.pipe(
          error,
          errorModel.fromErrorUnknown,
          R.forEach((err) => errorOut$.next(err)),
        ),
      )

    return new this({ ...parameters, client, errorOut$ })
  }
}
