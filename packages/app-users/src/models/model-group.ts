import { v4 as uuid } from 'uuid'

export interface Group {
  avatar?: string
  id?: string
  idLocal: string
  name: string
  role: string
}

export interface GroupSerialized {
  avatar?: string
  id?: string
  name?: string
  role?: string
}

class ModelGroup {
  // Transform
  static fromGroupSerialized = (group: GroupSerialized): Group => {
    return {
      avatar: group.avatar,
      id: group.id,
      idLocal: group.id ?? uuid(),
      name: group.name ?? 'N/A',
      role: group.role ?? 'N/A',
    }
  }

  static toGroupSerialized = (group: Group): GroupSerialized => {
    return group
  }
}

export default ModelGroup
