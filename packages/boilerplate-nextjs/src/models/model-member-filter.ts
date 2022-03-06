import * as R from 'ramda'

import ModelFilter, { FilterPageSize } from './model-filter'

export interface MemberFilter {
  email: string
  page?: number
  pageSize?: FilterPageSize
  status: string
}

export interface MemberFilterSerialized {
  email?: string
  page?: string
  pageSize?: string
  status?: string
}

class ModelMemberFilter {
  // Serializer
  static deserialize = (filter: MemberFilterSerialized): MemberFilter => {
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

  static deserializePaginated = (filter?: MemberFilterSerialized): MemberFilter => {
    return ModelMemberFilter.deserialize({
      ...filter,
      page: filter?.page ?? '1',
      pageSize: filter?.pageSize ?? '10',
    })
  }

  static serialize = (filter: MemberFilter): MemberFilterSerialized => {
    return {
      email: filter.email || undefined,
      page: filter.page?.toString(),
      pageSize: filter.pageSize?.toString(),
      status: filter.status || undefined,
    }
  }

  // Filters
  static filterByEmail(email: string) {
    return (member: MemberFilterSerialized) => !email || !!member.email?.includes(email)
  }

  static filterByStatus(status: string) {
    return (member: MemberFilterSerialized) => !status || member.status === status
  }
}

export default ModelMemberFilter
