import { v4 as uuid } from 'uuid'

export interface Group {
  avatar?: string
  id?: string
  idLocal: string
  name: string
  role: string
}

export interface GroupData {
  avatar?: string
  id?: string
  name?: string
  role?: string
}

export class ModelGroup {
  // Transform
  static fromData = (group: GroupData): Group => {
    return {
      avatar: group.avatar,
      id: group.id,
      idLocal: group.id ?? uuid(),
      name: group.name ?? 'N/A',
      role: group.role ?? 'N/A',
    }
  }

  static toData = (group: Group): GroupData => {
    return group
  }
}
