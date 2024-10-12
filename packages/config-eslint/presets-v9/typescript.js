import { typescriptEslintConfigs } from '../configs-v9/typescript'
import { javascript } from './javascript'

export const typescript = [...javascript, ...typescriptEslintConfigs]
