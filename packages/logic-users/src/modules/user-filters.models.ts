import { PlatformParameters } from '@gnowth/lib-platform'

import { userFilterSchema, userFilterSchemaData, userFilterSchemaParams } from './user-filters.schemas'
import { UserFilter, UserFilterData, UserFilterParams } from './user-filters.types'

export class UserFilterModel {
  fromData = (userFilterData: UserFilterData): UserFilter => {
    return userFilterSchema.parse(userFilterData)
  }

  toData = (userFilter: UserFilter): UserFilterData => {
    return userFilterSchemaData.parse(userFilter)
  }

  static async construct(_parameters: PlatformParameters): Promise<UserFilterModel> {
    return new this()
  }

  toParams(userFilter: UserFilter): UserFilterParams {
    return userFilterSchemaParams.parse(userFilter)
  }
}
