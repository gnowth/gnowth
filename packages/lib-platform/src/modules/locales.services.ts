import { createInstance } from 'i18next'
import i18nLanguageDetector from 'i18next-browser-languagedetector'
import i18nBackend from 'i18next-http-backend'

import { PlatformConstant, PlatformParameters } from '../core/platform'
import { ErrorStream1 } from './errors.streams'

type Locale = 'en' | 'en-CA' | 'en-US' | 'fr'
type LocaleSnake = 'en' | 'en_CA' | 'en_US' | 'fr'

type Parameters = { errorStream: ErrorStream1 } & PlatformParameters
export class LocaleService {
  #errorStream: ErrorStream1

  constructor(parameters: Parameters) {
    this.#errorStream = parameters.errorStream
  }

  static async construct(parameters: PlatformParameters): Promise<LocaleService> {
    const errorStream = await parameters.platform.providerGet<ErrorStream1>({
      name: PlatformConstant.errorStream,
      type: 'provider',
    })
    return new this({ ...parameters, errorStream })
  }

  createI18nInstance() {
    const i18n = createInstance()

    i18n
      .use(i18nBackend) // load translation using http. docs: https://github.com/i18next/i18next-http-backend
      .use(i18nLanguageDetector) // detect user language. docs: https://github.com/i18next/i18next-browser-languageDetector
      .init({ debug: false, fallbackLng: 'en' }) // for all options docs: https://www.i18next.com/overview/configuration-options
      .catch(this.#errorStream.nextUnknown)

    return i18n
  }

  get locale(): Locale {
    return 'en-US'
  }

  get locales(): Locale[] {
    return ['en-US', 'en']
  }

  get localesSnake(): LocaleSnake[] {
    return ['en_US']
  }
}
