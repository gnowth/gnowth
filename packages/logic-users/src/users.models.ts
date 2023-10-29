import type { UtilOptional } from '@gnowth/lib-utils'
import type { ServiceFaker } from '@gnowth/logic-core'
import { v4 as uuid } from 'uuid'

import type { ErrorType } from './errors'
import type { ServiceEvent } from './events'
import type { User, UserData } from './users.types'
import { TokenErrorInternal } from './errors.tokens'
import { errorMessagesInternal } from './errors.messages'

type Parameters = {
  serviceEvent?: ServiceEvent
  serviceFaker?: ServiceFaker
}

export class ModelUser {
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

  generate(user: UtilOptional<User, 'status'>, parameters?: Parameters): User {
    const userGenerated = { ...user, status: user.status ?? 'deactivated' }

    parameters?.serviceEvent?.logIfError({
      code: TokenErrorInternal.IN0000,
      errors: this.validate(userGenerated),
      messages: errorMessagesInternal,
      method: 'generate',
      payload: userGenerated,
      values: { entity: 'user' },
    })

    return userGenerated
  }

  generateFake(user?: Partial<User>, parameters?: Parameters): User {
    parameters?.serviceEvent?.logIfError({
      code: TokenErrorInternal.IN0000,
      errors: parameters?.serviceFaker
        ? []
        : [
            {
              code: TokenErrorInternal.IN0001,
              messages: errorMessagesInternal,
              values: { service: 'faker' },
            },
          ],
      messages: errorMessagesInternal,
      method: 'generateFake',
      values: { entity: 'user' },
    })

    const id = parameters?.serviceFaker?.stringUuid({ value: user?.id }) ?? ''
    const nameFirst = parameters?.serviceFaker?.personFirstName({ seed: id, value: user?.nameFirst }) ?? ''
    const nameLast = parameters?.serviceFaker?.personLastName({ seed: id, value: user?.nameLast }) ?? ''

    return this.generate({
      ...user,
      email:
        parameters?.serviceFaker?.internetEmail({
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
