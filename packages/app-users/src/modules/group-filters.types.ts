import { z } from 'zod'

import { groupFilterSchema, groupFilterSchemaData, groupFilterSchemaParams } from './group-filters.schemas'

export type GroupFilter = z.infer<typeof groupFilterSchema>
export type GroupFilterData = z.infer<typeof groupFilterSchemaData>
export type GroupFilterParams = z.infer<typeof groupFilterSchemaParams>
