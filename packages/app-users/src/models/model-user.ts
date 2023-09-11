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

export interface UserSerialized {
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
  static getId = (user: User) => {
    return user.id ?? user.idLocal
  }

  static getIdServer = (user: User) => {
    return user.id
  }

  static getNameFull = (user: User) => {
    return `${user.nameFirst} ${user.nameLast}`
  }

  // Filter

  // Transform
  static fromUserSerialized = (user: UserSerialized): User => {
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

  static toString = (user: User) => {
    return `${user.nameLast}, ${user.nameFirst}`
  }

  static toUserSerialized = (user: User): UserSerialized => {
    return user
  }
}
