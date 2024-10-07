import { User } from '@gnowth/app-users'

import { Task } from './task'

export type Board = {
  createdBy: User
  isPublic: boolean
  name: string
  tasks: Task[]
  users: User[]
  uuid: string
}
