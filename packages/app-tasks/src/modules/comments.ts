import { User } from '@gnowth/app-users'

export type Comment = {
  content: string
  createdBy: User
  uuid: string
}
