import type { User } from '@gnowth/logic-users'

import type { Task } from './task'

export type Board = {
  createdBy: User
  isPublic: boolean
  name: string
  tasks: Task[]
  users: User[]
  uuid: string
}
