import type { LocaleModule } from './locales.modules'

type Locale = 'en' | 'en-CA' | 'en-US' | 'fr'
type LocaleSnake = 'en' | 'en_CA' | 'en_US' | 'fr'

type Parameters = { module: LocaleModule }
export class LocaleService {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static async construct(parameters: Parameters): Promise<LocaleService> {
    return new this()
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
