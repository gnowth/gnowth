import { PlatformParameters } from '@gnowth/lib-platform'

import { groupFilterSchema, groupFilterSchemaData, groupFilterSchemaParams } from './group-filters.schemas'
import { GroupFilter, GroupFilterData, GroupFilterParams } from './group-filters.types'

export class GroupFilterModel {
  fromData = (groupFilterData: GroupFilterData): GroupFilter => {
    return groupFilterSchema.parse(groupFilterData)
  }

  toData = (groupFilter: GroupFilter): GroupFilterData => {
    return groupFilterSchemaData.parse(groupFilter)
  }

  static async construct(_parameters: PlatformParameters): Promise<GroupFilterModel> {
    return new this()
  }

  toParams(groupFilter: GroupFilter): GroupFilterParams {
    return groupFilterSchemaParams.parse(groupFilter)
  }
}
