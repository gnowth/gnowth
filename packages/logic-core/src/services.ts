interface OptionsFaker<Type> {
  seed?: string
  value?: Type
}

interface OptionsFakerEmail<Type> extends OptionsFaker<Type> {
  firstName?: string
  lastName?: string
}

export type ServiceFaker = {
  internet: {
    email: (options: OptionsFakerEmail<string>) => string
  }
  person: {
    firstName: (options: OptionsFaker<string>) => string
    lastName: (options: OptionsFaker<string>) => string
  }
  string: {
    uuid: (options: OptionsFaker<string>) => string
  }
}

export type ServiceFlag = ''
