import { z } from 'zod'

export const groupSchema = z.object({
  avatar: z.string().optional(),
  id: z.string(),
  key: z.string(),
  name: z.string().default(''),
})

export const groupSchemaData = z.object({
  avatar: z.string().optional(),
  id: z.string().optional(),
  name: z.string().optional(),
})
