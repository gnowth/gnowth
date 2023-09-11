import { FilterPageSize, ModelFilter } from '@gnowth/core-app'

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

export class ModelUserFilter {
  // Filters
  static filterByEmail(email: string) {
    return (user: UserFilterSerialized) => !email || !!user.email?.includes(email)
  }

  static filterByStatus(status: string) {
    return (user: UserFilterSerialized) => !status || user.status === status
  }

  // Transform
  static fromUserFilterSerialized = (filter: UserFilterSerialized): UserFilter => {
    return {
      email: filter.email ?? '',
      page: filter.page ? Number(filter.page) : undefined,
      pageSize: ModelFilter.getPageSize(filter.pageSize),
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
