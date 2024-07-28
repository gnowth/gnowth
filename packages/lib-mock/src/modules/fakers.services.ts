import type { Faker } from '@faker-js/faker'
import * as fakerModule from '@faker-js/faker'
import { LocaleService, RepositoryService, TokenServices, repositoryGet } from '@gnowth/lib-repository'

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

  async onInit(): Promise<void> {
    const repository = await repositoryGet()
    const localeService = await repository.serviceGet<LocaleService>({ name: TokenServices.locales })
    const locales = localeService.localesSnake
    const FakerConstructor = fakerModule.Faker
    this.#faker = new FakerConstructor({ locale: locales.map((locale) => fakerModule[locale]) })
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
}
