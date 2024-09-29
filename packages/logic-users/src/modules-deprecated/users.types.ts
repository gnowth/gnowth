export type UserStatus = 'active' | 'deactivated'

export type User = {
  avatar?: string
  email: string
  id: string
  key: string
  nameFirst: string
  nameLast: string
  role?: string
  status: UserStatus
}

export type UserData = {
  avatar?: string
  email?: string
  id?: string
  nameFirst?: string
  nameLast?: string
  role?: string
  status?: UserStatus
}
