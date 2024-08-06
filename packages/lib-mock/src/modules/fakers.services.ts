import type { Faker } from '@faker-js/faker'
import type { LocaleService } from '@gnowth/lib-platform'

import * as fakerModule from '@faker-js/faker'

import type { FakerModule } from './fakers.modules'

interface ParametersFaker<Type> {
  seed?: string
  value?: Type
}

interface ParametersFakerEmail<Type> extends ParametersFaker<Type> {
  firstName?: string
  lastName?: string
}

type Parameters = { faker?: Faker; module: FakerModule }
export class FakerService {
  #faker!: Faker

  constructor(parameters: Required<Parameters>) {
    this.#faker = parameters.faker
  }

  static async construct(parameters: Parameters): Promise<FakerService> {
    if (parameters.faker) {
      return new this({ ...parameters, faker: parameters.faker })
    }
    const localeService = await parameters.module.localeModule.providerGet<LocaleService>({
      name: parameters.module.localeModule.providerToken.service,
    })
    const locales = localeService.localesSnake
    const FakerConstructor = fakerModule.Faker
    const faker = new FakerConstructor({ locale: locales.map((locale) => fakerModule[locale]) })
    return new this({ faker, ...parameters })
  }

  #hash(seed?: string): number | undefined {
    if (seed === undefined) {
      return undefined
    }

    return seed
      .split('')
      .reduce(
        (hashCode, currentVal) =>
          (hashCode = currentVal.charCodeAt(0) + (hashCode << 6) + (hashCode << 16) - hashCode),
        0,
      )
  }

  internetEmail(parameters?: ParametersFakerEmail<string>): string {
    if (parameters?.value !== undefined) {
      return parameters?.value
    }

    this.#faker.seed(this.#hash(parameters?.seed))

    return this.#faker.internet.email(parameters)
  }

  personFirstName(parameters?: ParametersFaker<string>): string {
    if (parameters?.value !== undefined) {
      return parameters?.value
    }

    this.#faker.seed(this.#hash(parameters?.seed))

    return this.#faker.person.firstName()
  }

  personLastName(parameters?: ParametersFaker<string>): string {
    if (parameters?.value !== undefined) {
      return parameters?.value
    }

    this.#faker.seed(this.#hash(parameters?.seed))

    return this.#faker.person.lastName()
  }

  stringUuid(parameters: ParametersFaker<string>) {
    if (parameters?.value !== undefined) {
      return parameters?.value
    }

    this.#faker.seed(this.#hash(parameters?.seed))

    return this.#faker.string.uuid()
  }
}
