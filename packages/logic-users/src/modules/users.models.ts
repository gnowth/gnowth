import type { UtilOptional } from '@gnowth/lib-utils'
import type { ErrorData, EventService, FakerService } from '@gnowth/logic-core'
import { Model } from '@gnowth/lib-model'
import { v4 as uuid } from 'uuid'

import type { User, UserData } from './users.types'

type Parameters = {
  eventService?: EventService
  fakerService?: FakerService
}

export class UserModel extends Model<User> {
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

    parameters?.eventService?.logIfError({
      code: 'logic-users--model-users--generate--01',
      errors: this.validate(userGenerated),
      message: 'Unable to create valid User',
      method: 'generate',
      payload: userGenerated,
    })

    return userGenerated
  }

  generateFake(user?: Partial<User>, parameters?: Parameters): User {
    parameters?.eventService?.logIfError({
      code: 'logic-users--model-user--generate-fake--01',
      errors: parameters?.fakerService
        ? []
        : [
            {
              code: 'logic-users--model-user--generate-fake--02',
              message: 'Service faker is not available',
            },
          ],
      message: 'Unable to create valid User',
      method: 'generateFake',
    })

    const id = parameters?.fakerService?.stringUuid({ value: user?.id }) ?? ''
    const nameFirst = parameters?.fakerService?.personFirstName({ seed: id, value: user?.nameFirst }) ?? ''
    const nameLast = parameters?.fakerService?.personLastName({ seed: id, value: user?.nameLast }) ?? ''

    return this.generate({
      ...user,
      email:
        parameters?.fakerService?.internetEmail({
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

  validate(user: User): ErrorData[] {
    return user ? [] : []
  }
}
