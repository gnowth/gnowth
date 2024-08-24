import type { PlatformParameters } from '../core/platform'

type Locale = 'en' | 'en-CA' | 'en-US' | 'fr'
type LocaleSnake = 'en' | 'en_CA' | 'en_US' | 'fr'

export class LocaleService {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static async construct(parameters: PlatformParameters): Promise<LocaleService> {
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
