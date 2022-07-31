import fs from 'fs'

import systaxes from './syntaxes'

const data = JSON.stringify(systaxes)

fs.writeFileSync('./syntaxes/ty.tmLanguage.json', data)
