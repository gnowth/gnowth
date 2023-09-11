import fs from 'fs'

import { syntaxes } from './syntaxes'

const data = JSON.stringify(syntaxes)

fs.writeFileSync('./syntaxes/ty.tmLanguage.json', data)
