import { SortType } from '@gnowth/logic-core'
import type { UserStatus } from './users'

export type UserFilterKey = 'email' | 'nameFirst' | 'nameLast' | 'status'
export type UserSortKey = 'email' | 'nameFirst' | 'nameLast' | 'status'

export type UserFilter = {
  email?: string
  nameFirst?: string
  nameLast?: string
  page?: number
  pageSize?: number
  search?: string
  sortBy: SortType<UserSortKey>[]
  status?: string
}

export type UserFilterData = {
  email?: string
  nameFirst?: string
  nameLast?: string
  page?: number
  pageSize?: number
  search?: string
  sortBy: SortType<UserSortKey>[]
  status?: string
}

export type UserFilterParams = {
  email?: string
  nameFirst?: string
  nameLast?: string
  page?: number
  pageSize?: number
  search?: string
  sortBy: SortType<UserSortKey>[]
  status?: string
}
