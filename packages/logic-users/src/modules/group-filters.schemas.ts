import { z } from 'zod'

const sortBySchema = z.enum(['-name', '-status', 'name', 'status'])

export const groupFilterSchema = z.object({
  name: z.string().optional(),
  page: z.number().optional(),
  pageSize: z.number().optional(),
  search: z.string().optional(),
  sortBy: sortBySchema.array().optional(),
  status: z.string().optional(),
})

export const groupFilterSchemaData = groupFilterSchema
export const groupFilterSchemaParams = groupFilterSchema
