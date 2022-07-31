interface Capture {
  name: string
}

interface PatternInclude {
  comment?: string
  include: string
}

interface Pattern {
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

export interface Syntax {
  $schema: string
  comment?: string
  name: string
  patterns: (Pattern | PatternInclude)[]
  repository: Record<string, Pattern>
  scopeName: string
  version?: string
}

export interface PatternRecord {
  include: PatternInclude
  repository: Record<string, Pattern>
}
