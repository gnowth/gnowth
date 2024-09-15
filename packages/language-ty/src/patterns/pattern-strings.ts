import { PatternRecord } from '../types'

export const patternStrings: PatternRecord = {
  include: {
    include: '#strings',
  },
  repository: {
    strings: {
      begin: '"',
      end: '"',
      name: 'string.quoted.double.ty',
      patterns: [
        {
          match: '\\\\.',
          name: 'constant.character.escape.ty',
        },
      ],
    },
  },
}
