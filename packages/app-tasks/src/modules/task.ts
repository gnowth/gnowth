import { User } from '@gnowth/app-users'

import { Comment } from './comments'
import { Status } from './statuses'

export type Task = {
  assignedTo: User[]
  comments: Comment[]
  createdBy: User
  description?: string
  dueDate?: Date
  isArchived: boolean
  status: Status
  title: string
  uuid: string
}
