import type { User } from '@gnowth/logic-users'

import type { Comment } from './comments'
import type { Status } from './statuses'

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
