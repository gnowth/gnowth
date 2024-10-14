import { typescriptEslintConfigs } from '../configs/typescript.js'
import { javascript } from './javascript.js'

export const typescript = [...javascript, ...typescriptEslintConfigs]
