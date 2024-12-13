import { PlatformParameters } from '@gnowth/lib-react'

import { groupFilterSchema, groupFilterSchemaData, groupFilterSchemaParams } from './group-filters.schemas'
import { GroupFilter, GroupFilterData, GroupFilterParams } from './group-filters.types'

export class GroupFilterModel {
  static async construct(_parameters: PlatformParameters): Promise<GroupFilterModel> {
    return new this()
  }

  fromData = (groupFilterData: GroupFilterData): GroupFilter => {
    return groupFilterSchema.parse(groupFilterData)
  }

  toData = (groupFilter: GroupFilter): GroupFilterData => {
    return groupFilterSchemaData.parse(groupFilter)
  }

  toParams(groupFilter: GroupFilter): GroupFilterParams {
    return groupFilterSchemaParams.parse(groupFilter)
  }
}
