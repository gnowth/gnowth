import type { GroupFilter, GroupFilterData, GroupFilterParams } from './group-filters.types'

export class ModelGroupFilter {
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
