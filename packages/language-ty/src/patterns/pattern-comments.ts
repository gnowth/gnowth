import type { PatternRecord } from '../types'

const Constant = {
  punctuationDefinitionCommentTy: 'punctuation.definition.comment.ty',
}
export const patternComments: PatternRecord = {
  include: {
    include: '#comments',
  },
  repository: {
    comments: {
      patterns: [
        {
          captures: {
            '1': {
              name: Constant.punctuationDefinitionCommentTy,
            },
          },
          match: '\\A^(#!).*$\\n?',
          name: 'comment.line.number-sign.ty',
        },
        {
          match: '\\*/',
          name: 'invalid.illegal.unexpected-end-of-block-comment.ty',
        },
        {
          begin: '(^[ \\t]+)?(?=//)',
          beginCaptures: {
            '1': {
              name: 'punctuation.whitespace.comment.leading.ty',
            },
          },
          end: '(?!\\G)',
          patterns: [
            {
              begin: '///',
              beginCaptures: {
                '0': {
                  name: Constant.punctuationDefinitionCommentTy,
                },
              },
              end: '^',
              name: 'comment.line.triple-slash.documentation.ty',
            },
            {
              begin: '//:',
              beginCaptures: {
                '0': {
                  name: Constant.punctuationDefinitionCommentTy,
                },
              },
              end: '^',
              name: 'comment.line.double-slash.documentation.ty',
            },
            {
              begin: '//',
              beginCaptures: {
                '0': {
                  name: Constant.punctuationDefinitionCommentTy,
                },
              },
              end: '^',
              name: 'comment.line.double-slash.ty',
            },
          ],
        },
      ],
    },
  },
}
