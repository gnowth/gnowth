import type { Faker } from '@faker-js/faker'
import * as fakerModule from '@faker-js/faker'
import { Service, TokenServices, repositoryGetAsync } from '@gnowth/lib-repository'

interface ParametersFaker<Type> {
  seed?: string
  value?: Type
}

interface ParametersFakerEmail<Type> extends ParametersFaker<Type> {
  firstName?: string
  lastName?: string
}

export class FakerService extends Service {
  #faker!: Faker

  async onInit(): Promise<void> {
    const repository = await repositoryGetAsync()
    const localisationService = repository.serviceGet(TokenServices.localisations)
    const locales = localisationService.localesSnake
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