import { FilterPageSize, ModelFilter } from '@app/core'
import * as R from 'ramda'

export interface UserFilter {
  email: string
  page?: number
  pageSize?: FilterPageSize
  status: string
}

export interface UserFilterSerialized {
  email?: string
  page?: string
  pageSize?: string
  status?: string
}

class ModelUserFilter {
  // Filters
  static filterByEmail(email: string) {
    return (user: UserFilterSerialized) => !email || !!user.email?.includes(email)
  }

  static filterByStatus(status: string) {
    return (user: UserFilterSerialized) => !status || user.status === status
  }

  // Transform
  static fromUserFilterSerialized = (filter: UserFilterSerialized): UserFilter => {
    const getPageSize = R.cond([
      [ModelFilter.isFilterPageSize, R.always(Number(filter.pageSize) as FilterPageSize)],
      [R.is(Number), R.always(FilterPageSize.i10)],
      [R.T, R.always(undefined)],
    ])

    return {
      email: filter.email ?? '',
      page: filter.page ? Number(filter.page) : undefined,
      pageSize: getPageSize(filter.pageSize),
      status: filter.status ?? '',
    }
  }

  static fromUserFilterSerializedPaginated = (filter: UserFilterSerialized): UserFilter => {
    return ModelUserFilter.fromUserFilterSerialized({
      ...filter,
      page: filter?.page ?? '1',
      pageSize: filter?.pageSize ?? '10',
    })
  }

  static toUserFilterSerialized = (filter: UserFilter): UserFilterSerialized => {
    return {
      email: filter.email || undefined,
      page: filter.page?.toString(),
      pageSize: filter.pageSize?.toString(),
      status: filter.status || undefined,
    }
  }
}

export default ModelUserFilter
