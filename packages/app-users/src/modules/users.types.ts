import { z } from 'zod'

import { userSchema, userSchemaData } from './users.schemas'

export type User = z.infer<typeof userSchema>
export type UserData = z.infer<typeof userSchemaData>
