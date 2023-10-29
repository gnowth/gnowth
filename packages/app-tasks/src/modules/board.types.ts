import type { User } from '@gnowth/logic-users'

import type { Task } from './task.types'

export type TaskBoard = {
  createdBy: User
  isPublic: boolean
  name: string
  tasks: Task[]
  users: User[]
  uuid: string
}
