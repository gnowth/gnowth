import { v4 as uuid } from 'uuid'

export interface User {
  avatar?: string
  email: string
  id?: string
  idLocal: string
  nameFirst: string
  nameLast: string
  role: string
  status: 'active' | 'deactivated'
}

export interface UserData {
  avatar?: string
  email?: string
  id?: string
  nameFirst?: string
  nameLast?: string
  role?: string
  status?: 'active' | 'deactivated'
}

export class ModelUser {
  // Getter
  getKey = (user: User) => {
    return user.id ?? user.idLocal
  }

  getId = (user: User) => {
    return user.id
  }

  getNameFull = (user: User) => {
    return `${user.nameFirst} ${user.nameLast}`
  }

  // Filter

  // Transform
  fromData = (user: UserData): User => {
    return {
      avatar: user.avatar,
      email: user.email ?? '',
      id: user.id,
      idLocal: user.id ?? uuid(),
      nameFirst: user.nameFirst ?? '',
      nameLast: user.nameLast ?? '',
      role: user.role ?? 'N/A',
      status: user.status ?? 'deactivated',
    }
  }

  toString = (user: User) => {
    return `${user.nameLast}, ${user.nameFirst}`
  }

  toData = (user: User): UserData => {
    return user
  }
}
