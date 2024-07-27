import { Service } from './services'

type Locale = 'en' | 'en-CA' | 'en-US' | 'fr'
type LocaleSnake = 'en' | 'en_CA' | 'en_US' | 'fr'

export class LocaleService extends Service {
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
