import type { PatternRecord } from '../types'

const strings: PatternRecord = {
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

export default strings
