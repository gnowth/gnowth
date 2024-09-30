import { Model } from '@gnowth/lib-model'

import { GroupFilter, GroupFilterData, GroupFilterParams } from './group-filters.types'

export class GroupFilterModel extends Model<GroupFilter> {
  fromData(data: GroupFilterData): GroupFilter {
    return data
  }

  toData(groupFilter: GroupFilter): GroupFilterData {
    return groupFilter
  }

  toParams(groupFilter: GroupFilter): GroupFilterParams {
    return groupFilter ?? null
  }
}
