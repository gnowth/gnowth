import type { UtilOptional } from '@gnowth/lib-utils'
import type { ServiceFaker, ServiceFlag, ServiceLogger, ErrorType, ModelError } from '@gnowth/logic-core'
import { v4 as uuid } from 'uuid'

import type { User, UserData } from './users.types'

export const USER_STATUSES = ['active', 'deactivated'] as const
export type UserStatus = (typeof USER_STATUSES)[number]

type Dependencies = {
  modelError: ModelError
  serviceFaker?: ServiceFaker
  serviceFlag?: ServiceFlag
  serviceLogger?: ServiceLogger
}

type Parameters = {
  dependencies: Dependencies
}

// TODO: implement
export class ModelUser {
  private dependencies: Dependencies
  private options: Parameters

  constructor(options: Parameters) {
    this.dependencies = {
      ...options.dependencies,
      serviceLogger: options.dependencies.serviceLogger?.clone({ name: 'ModelUser' }),
    }
    this.options = options
  }

  getId(user: User) {
    return user.id
  }

  getKey(user: User) {
    return user.key
  }

  getNameFull(user: User) {
    return `${user.nameFirst} ${user.nameLast}`
  }

  fromData(user: UserData): User {
    // TODO: report error if required field not available
    return {
      avatar: user.avatar,
      email: user.email ?? '',
      id: user.id ?? uuid(),
      key: user.id ?? uuid(),
      nameFirst: user.nameFirst ?? '',
      nameLast: user.nameLast ?? '',
      role: user.role ?? 'N/A',
      status: user.status ?? 'deactivated',
    }
  }

  toData(user: User): UserData {
    return user
  }

  toString(user: User) {
    return `${user.nameLast}, ${user.nameFirst}`
  }

  generate(user: UtilOptional<User, 'status'>): User {
    const userGenerated = { ...user, status: user.status ?? 'deactivated' }
    const errors = this.validate(userGenerated)

    this.dependencies.serviceLogger?.bugIfErrors({
      errors,
      message: 'unable to create a valid User',
      method: 'generate',
      payload: userGenerated,
    })

    return userGenerated
  }

  // TODO: decorator to check for dependency
  // @dependencyCheck('serviceFaker', 'unable to create a valid User')
  // this.dependencies.serviceLogger?.bugIfErrors({
  //   errors: this.dependencies.serviceFaker
  //     ? []
  //     : [this.dependencies.modelError.generateForInternal({ message: 'serviceFaker is not available' })],
  //   method: 'generateFake',
  //   message: 'unable to create a valid User',
  // })
  generateFake(user?: Partial<User>): User {
    const id = this.dependencies.serviceFaker?.stringUuid({ value: user?.id }) ?? ''
    const nameFirst =
      this.dependencies.serviceFaker?.personFirstName({ seed: id, value: user?.nameFirst }) ?? ''
    const nameLast = this.dependencies.serviceFaker?.personLastName({ seed: id, value: user?.nameLast }) ?? ''

    return this.generate({
      ...user,
      email:
        this.dependencies.serviceFaker?.internetEmail({
          firstName: nameFirst,
          lastName: nameLast,
          seed: id,
          value: user?.email,
        }) ?? '',
      id,
      key: id,
      nameFirst,
      nameLast,
    })
  }

  isValid(user: User): boolean {
    return this.validate(user).length === 0
  }

  validate(user: User): ErrorType[] {
    return user ? [] : []
  }
}
