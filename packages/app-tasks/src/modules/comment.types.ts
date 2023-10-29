import type { User } from '@gnowth/logic-users'

export type TaskComment = {
  content: string
  createdBy: User
  uuid: string
}
