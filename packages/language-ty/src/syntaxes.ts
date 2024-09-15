import { patternComments } from './patterns/pattern-comments'
import { patternKeywords } from './patterns/pattern-keywords'
import { patternStrings } from './patterns/pattern-strings'
import { Syntax } from './types'

const SCHEMA_URL = 'https://raw.githubusercontent.com/martinring/tmlanguage/master/tmlanguage.json'

export const syntaxes: Syntax = {
  $schema: SCHEMA_URL,
  name: 'ty',
  patterns: [patternComments.include, patternKeywords.include, patternStrings.include],
  repository: {
    ...patternComments.repository,
    ...patternKeywords.repository,
    ...patternStrings.repository,
  },
  scopeName: 'source.ty',
}
