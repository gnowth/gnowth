import type { Faker } from '@faker-js/faker'

interface OptionsFaker {
  faker: Faker
}

interface OptionsFakerBase<Type> {
  seed?: string
  value?: Type
}

interface OptionsFakerEmail<Type> extends OptionsFakerBase<Type> {
  firstName?: string
  lastName?: string
}

export class FakerService {
  private faker: Faker

  constructor(options: OptionsFaker) {
    this.faker = options.faker
  }

  internetEmail(options?: OptionsFakerEmail<string>): string {
    if (options?.value !== undefined) {
      return options?.value
    }

    this.faker.seed(this.hash(options?.seed))

    return this.faker.internet.email(options)
  }

  personFirstName(options?: OptionsFakerBase<string>): string {
    if (options?.value !== undefined) {
      return options?.value
    }

    this.faker.seed(this.hash(options?.seed))

    return this.faker.person.firstName()
  }

  personLastName(options?: OptionsFakerBase<string>): string {
    if (options?.value !== undefined) {
      return options?.value
    }

    this.faker.seed(this.hash(options?.seed))

    return this.faker.person.lastName()
  }

  stringUuid(options: OptionsFakerBase<string>) {
    if (options?.value !== undefined) {
      return options?.value
    }

    this.faker.seed(this.hash(options?.seed))

    return this.faker.string.uuid()
  }

  private hash(seed?: string): number | undefined {
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
