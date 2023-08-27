import type { User } from './user'

export interface Comment {
  content: string
  createdBy: User
  uuid: string
}
