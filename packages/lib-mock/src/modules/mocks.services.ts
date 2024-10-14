import { Platform, PlatformConstructors, PlatformParameters } from '@gnowth/lib-platform'

import { MockConstant } from './mocks.constants'
import { MockClient } from './mocks.types'

type MockParameterAny<Type> = {
  seed?: string
  value?: Type
}

type MockParameterEmail<Type> = {
  firstName?: string
  lastName?: string
} & MockParameterAny<Type>

type Parameters = { mockClient: MockClient } & PlatformParameters
export class MockService {
  #client: MockClient
  #constructors: PlatformConstructors
  #platform: Platform

  constructor(parameters: Parameters) {
    this.#client = parameters.mockClient
    this.#constructors = parameters.constructors ?? {}
    this.#platform = parameters.platform
  }

  static async construct(parameters: PlatformParameters) {
    const mockClient = await parameters.platform.clientGet<MockClient>({
      constructors: parameters.constructors,
      name: MockConstant.mockClient,
    })
    return new this({ mockClient, ...parameters })
  }

  #hash(seed?: string): number | undefined {
    if (seed === undefined) {
      return undefined
    }

    return seed
      .split('')
      .reduce(
        (hashCode, currentVal) => currentVal.charCodeAt(0) + (hashCode << 6) + (hashCode << 16) - hashCode,
        0,
      )
  }

  internetEmail(parameters?: MockParameterEmail<string>): string {
    return parameters?.value === undefined
      ? this.#client.internetEmail({ ...parameters, seed: this.#hash(parameters?.seed) })
      : parameters.value
  }

  personFirstName(parameters?: MockParameterAny<string>): string {
    return parameters?.value === undefined
      ? this.#client.personFirstName({ ...parameters, seed: this.#hash(parameters?.seed) })
      : parameters.value
  }

  personLastName(parameters?: MockParameterAny<string>): string {
    return parameters?.value === undefined
      ? this.#client.personLastName({ ...parameters, seed: this.#hash(parameters?.seed) })
      : parameters.value
  }

  stringUuid(parameters: MockParameterAny<string>) {
    return parameters?.value === undefined
      ? this.#client.stringUuid({ ...parameters, seed: this.#hash(parameters?.seed) })
      : parameters.value
  }
}
