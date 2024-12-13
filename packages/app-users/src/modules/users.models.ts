import { ErrorData, ErrorModel, PlatformDependency, PlatformParameters } from '@gnowth/lib-react'
import { v4 as uuid } from 'uuid'

import { userSchema, userSchemaData } from './users.schemas'
import { User, UserData } from './users.types'

type Parameters = { errorModel: ErrorModel }
export class UserModel {
  #errorModel: ErrorModel

  constructor(parameters: Parameters) {
    this.#errorModel = parameters.errorModel
  }

  static async construct(parameters: PlatformParameters): Promise<UserModel> {
    const errorModel = await parameters.platform.providerGet<ErrorModel>({
      name: PlatformDependency.errorModel,
    })
    return new this({ errorModel })
  }

  fromData = (userData: UserData): User => {
    return userSchema.parse({ ...userData, key: userData.id ?? uuid() })
  }

  getId(user: User): string | undefined {
    return user.id
  }

  getKey(user: User): string {
    return user.key
  }

  getNameFull(user: User): string {
    return `${user.nameFirst} ${user.nameLast}`
  }

  isValid(user: User): boolean {
    return this.validate(user).length === 0
  }

  toData = (user: User): UserData => {
    return userSchemaData.parse(user)
  }

  toString(user: User): string {
    return `${user.nameLast}, ${user.nameFirst}`
  }

  validate(user: User): ErrorData[] {
    const result = userSchema.safeParse(user)
    return result.error ? this.#errorModel.fromErrorZod(result.error) : []
  }
}
