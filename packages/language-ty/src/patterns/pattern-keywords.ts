import type { PatternRecord } from '../types'

export const patternKeywords: PatternRecord = {
  include: {
    include: '#keywords',
  },
  repository: {
    keywords: {
      patterns: [
        {
          match:
            '\\b(if|while|for|return|func|var|let|constructor|protocol|class|async|throws|try|switch|case|extends|implements)\\b',
          name: 'keyword.control.ty',
        },
      ],
    },
  },
}
