import type { Syntax } from './types'
import patternComments from './patterns/pattern-comments'
import patternKeywords from './patterns/pattern-keywords'
import patternStrings from './patterns/pattern-strings'

const SCHEMA_URL = 'https://raw.githubusercontent.com/martinring/tmlanguage/master/tmlanguage.json'

const syntaxes: Syntax = {
  $schema: SCHEMA_URL,
  name: 'ty',
  scopeName: 'source.ty',
  patterns: [patternComments.include, patternKeywords.include, patternStrings.include],
  repository: {
    ...patternComments.repository,
    ...patternKeywords.repository,
    ...patternStrings.repository,
  },
}

export default syntaxes