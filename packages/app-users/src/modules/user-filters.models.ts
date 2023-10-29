import { FilterPageSize, ModelFilter } from '@gnowth/logic-core'

export interface UserFilter {
  email: string
  page?: number
  pageSize?: FilterPageSize
  status: string
}

export interface UserFilterData {
  email?: string
  page?: string
  pageSize?: string
  status?: string
}

export class ModelUserFilter {
  // Filters
  static filterByEmail(email: string) {
    return (user: UserFilterData) => !email || !!user.email?.includes(email)
  }

  static filterByStatus(status: string) {
    return (user: UserFilterData) => !status || user.status === status
  }

  // Transform
  static fromData = (filter: UserFilterData): UserFilter => {
    return {
      email: filter.email ?? '',
      page: filter.page ? Number(filter.page) : undefined,
      pageSize: ModelFilter.getPageSize(filter.pageSize),
      status: filter.status ?? '',
    }
  }

  static fromDataPaginated = (filter: UserFilterData): UserFilter => {
    return ModelUserFilter.fromData({
      ...filter,
      page: filter?.page ?? '1',
      pageSize: filter?.pageSize ?? '10',
    })
  }

  static toData = (filter: UserFilter): UserFilterData => {
    return {
      email: filter.email || undefined,
      page: filter.page?.toString(),
      pageSize: filter.pageSize?.toString(),
      status: filter.status || undefined,
    }
  }
}
