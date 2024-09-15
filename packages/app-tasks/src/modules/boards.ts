import { User } from '@gnowth/logic-users'

import { Task } from './task'

export type Board = {
  createdBy: User
  isPublic: boolean
  name: string
  tasks: Task[]
  users: User[]
  uuid: string
}
