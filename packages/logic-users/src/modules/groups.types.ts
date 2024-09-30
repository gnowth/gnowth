import { z } from 'zod'

import { groupSchema, groupSchemaData } from './groups.schemas'

export type Group = z.infer<typeof groupSchema>
export type GroupData = z.infer<typeof groupSchemaData>
