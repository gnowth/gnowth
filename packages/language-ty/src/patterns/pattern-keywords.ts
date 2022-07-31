import type { PatternRecord } from '../types'

const keywords: PatternRecord = {
  include: {
    include: '#keywords',
  },
  repository: {
    keywords: {
      patterns: [
        {
          name: 'keyword.control.ty',
          match:
            '\\b(if|while|for|return|func|var|let|constructor|protocol|class|async|throws|try|switch|case|extends|implements)\\b',
        },
      ],
    },
  },
}

export default keywords
