export interface MockClientParameterAny {
  seed?: number
}

export interface MockClientParameterEmail extends MockClientParameterAny {
  firstName?: string
  lastName?: string
}

export interface MockClient {
  internetEmail(parameters?: MockClientParameterEmail): string
  personFirstName(parameters?: MockClientParameterAny): string
  personLastName(parameters?: MockClientParameterAny): string
  stringUuid(parameters: MockClientParameterAny): string
}
