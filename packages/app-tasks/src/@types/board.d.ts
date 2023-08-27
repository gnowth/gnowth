import type { Task } from './task'
import type { User } from './user'

export interface Board {
  createdBy: User
  isPublic: boolean
  name: string
  tasks: Task[]
  users: User[]
  uuid: string
}
