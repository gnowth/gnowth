import type { UserSortKey, UserStatus } from './users'

export type User = {
  email: string
  id: string
  nameFirst: string
  nameLast: string
  status: UserStatus
}

export type UserFilters = {
  nameFirst?: string
  paramPage: number
  paramPageSize?: number
  paramSearch?: string
  sortBy: UserSortKey[]
  status?: UserStatus
}
