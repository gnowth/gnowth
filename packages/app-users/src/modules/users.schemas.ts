import { z } from 'zod'

const statusSchema = z.enum(['active', 'deactivated'])

export const userSchema = z.object({
  avatar: z.string().optional(),
  email: z.string().default(''),
  id: z.string().optional(),
  key: z.string(),
  nameFirst: z.string().default(''),
  nameLast: z.string().default(''),
  role: z.string().default('N/A'),
  status: statusSchema.default('deactivated'),
})

export const userSchemaData = z.object({
  avatar: z.string().optional(),
  email: z.string().optional(),
  id: z.string().optional(),
  nameFirst: z.string().optional(),
  nameLast: z.string().optional(),
  role: z.string().optional(),
  status: statusSchema.optional(),
})
