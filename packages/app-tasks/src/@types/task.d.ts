import type { Comment } from './comment'
import type { Status } from './status'
import type { User } from './user'

export interface Task {
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
