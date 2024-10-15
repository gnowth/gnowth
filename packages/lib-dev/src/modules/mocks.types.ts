export type MockClientParameterAny = {
  seed?: number
}

export type MockClientParameterEmail = {
  firstName?: string
  lastName?: string
} & MockClientParameterAny

export type MockClient = {
  internetEmail(parameters?: MockClientParameterEmail): string
  personFirstName(parameters?: MockClientParameterAny): string
  personLastName(parameters?: MockClientParameterAny): string
  stringUuid(parameters: MockClientParameterAny): string
}
