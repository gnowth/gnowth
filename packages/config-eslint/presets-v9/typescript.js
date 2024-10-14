import { typescriptEslintConfigs } from '../configs-v9/typescript.js'
import { javascript } from './javascript.js'

export const typescript = [...javascript, ...typescriptEslintConfigs]
