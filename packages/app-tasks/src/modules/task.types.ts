import type { User } from '@gnowth/logic-users'

import type { TaskComment } from './comment.types'
import type { TaskStatus } from './status.types'

export type Task = {
  assignedTo: User[]
  comments: TaskComment[]
  createdBy: User
  description?: string
  dueDate?: Date
  isArchived: boolean
  status: TaskStatus
  title: string
  uuid: string
}
