import type { PatternRecord } from '../types'

export const patternStrings: PatternRecord = {
  include: {
    include: '#strings',
  },
  repository: {
    strings: {
      name: 'string.quoted.double.ty',
      begin: '"',
      end: '"',
      patterns: [
        {
          name: 'constant.character.escape.ty',
          match: '\\\\.',
        },
      ],
    },
  },
}
