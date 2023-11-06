import type { User } from '@gnowth/logic-users'

export type Comment = {
  content: string
  createdBy: User
  uuid: string
}
