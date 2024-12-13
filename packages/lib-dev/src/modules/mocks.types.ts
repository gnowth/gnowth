export type MockClient = {
  internetEmail(parameters?: MockClientParameterEmail): string
  personFirstName(parameters?: MockClientParameterAny): string
  personLastName(parameters?: MockClientParameterAny): string
  stringUuid(parameters: MockClientParameterAny): string
}

export type MockClientParameterAny = {
  seed?: number
}

export type MockClientParameterEmail = MockClientParameterAny & {
  firstName?: string
  lastName?: string
}
