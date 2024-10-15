import { Faker } from '@faker-js/faker'
import * as fakerModule from '@faker-js/faker'
import {
  I18nService,
  Platform,
  PlatformConstructors,
  PlatformDependency,
  PlatformParameters,
} from '@gnowth/lib-platform'

import { MockClient, MockClientParameterAny, MockClientParameterEmail } from './mocks.types'

type Parameters = { fakerClient: Faker } & PlatformParameters
export class FakerClient implements MockClient {
  #client: Faker
  #constructors: PlatformConstructors
  #platform: Platform

  constructor(parameters: Parameters) {
    this.#client = parameters.fakerClient
    this.#constructors = parameters.constructors ?? {}
    this.#platform = parameters.platform
  }

  static async construct(parameters: PlatformParameters) {
    const i18nService = await parameters.platform.providerGet<I18nService>({
      constructors: parameters.constructors,
      name: PlatformDependency.i18nService,
    })
    const locales = i18nService.localesSnake
    const FakerConstructor = fakerModule.Faker
    const fakerClient = new FakerConstructor({ locale: locales.map((locale) => fakerModule[locale]) })
    return new this({ fakerClient, ...parameters })
  }

  internetEmail(parameters?: MockClientParameterEmail): string {
    this.#client.seed(parameters?.seed)
    return this.#client.internet.email(parameters)
  }

  personFirstName(parameters?: MockClientParameterAny): string {
    this.#client.seed(parameters?.seed)
    return this.#client.person.firstName()
  }

  personLastName(parameters?: MockClientParameterAny): string {
    this.#client.seed(parameters?.seed)
    return this.#client.person.lastName()
  }

  stringUuid(parameters: MockClientParameterAny) {
    this.#client.seed(parameters?.seed)
    return this.#client.string.uuid()
  }
}
