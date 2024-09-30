import { z } from 'zod'

import { userFilterSchema, userFilterSchemaData, userFilterSchemaParams } from './user-filters.schemas'

export type UserFilter = z.infer<typeof userFilterSchema>
export type UserFilterData = z.infer<typeof userFilterSchemaData>
export type UserFilterParams = z.infer<typeof userFilterSchemaParams>
