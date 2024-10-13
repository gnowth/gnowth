type Capture = {
  name: string
}

type PatternInclude = {
  comment?: string
  include: string
}

type Pattern = {
  begin?: string
  beginCaptures?: Record<string, Capture>
  captures?: Record<string, Capture>
  comment?: string
  end?: string
  endCaptures?: Record<string, Capture>
  match?: string
  name?: string
  patterns?: (Pattern | PatternInclude)[]
  repository?: Record<string, Pattern>
}

export type Syntax = {
  $schema: string
  comment?: string
  name: string
  patterns: (Pattern | PatternInclude)[]
  repository: Record<string, Pattern>
  scopeName: string
  version?: string
}

export type PatternRecord = {
  include: PatternInclude
  repository: Record<string, Pattern>
}
