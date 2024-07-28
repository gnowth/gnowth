import type { Faker } from '@faker-js/faker'

import * as fakerModule from '@faker-js/faker'
import { LocaleService, RepositoryService, TokenService } from '@gnowth/lib-repository'

interface ParametersFaker<Type> {
  seed?: string
  value?: Type
}

interface ParametersFakerEmail<Type> extends ParametersFaker<Type> {
  firstName?: string
  lastName?: string
}

export class FakerService extends RepositoryService {
  #faker!: Faker

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

  async onInit(): Promise<void> {
    const localeService = await this.repository.serviceGet<LocaleService>({ name: TokenService.locale })
    const locales = localeService.localesSnake
    const FakerConstructor = fakerModule.Faker
    this.#faker = new FakerConstructor({ locale: locales.map((locale) => fakerModule[locale]) })
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
