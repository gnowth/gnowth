import { z } from 'zod'

const sortBySchema = z.enum([
  '-email',
  '-nameFirst',
  '-nameLast',
  '-status',
  'email',
  'nameFirst',
  'nameLast',
  'status',
])

export const userFilterSchema = z.object({
  email: z.string().optional(),
  nameFirst: z.string().optional(),
  nameLast: z.string().optional(),
  page: z.number().optional(),
  pageSize: z.number().optional(),
  search: z.string().optional(),
  sortBy: sortBySchema.array().optional(),
  status: z.string().optional(),
})

export const userFilterSchemaData = userFilterSchema
export const userFilterSchemaParams = userFilterSchema
