import { v4 as uuid } from 'uuid'

import type { Group, GroupData } from './groups.types'

export class ModelGroup {
  fromData(group: GroupData): Group {
    // TODO throw error if missing data and read callback from parameters
    return {
      avatar: group.avatar,
      id: group.id,
      key: group.id ?? uuid(), // TODO: check if we should have it here
      name: group.name ?? 'N/A',
      role: group.role ?? 'N/A',
    }
  }

  getId(group: Group): string | null {
    return group.id ?? null
  }

  toData(group: Group): GroupData {
    return group
  }
}
