const logLevelOrder = ['NONE', 'BUG', 'ERROR', 'WARN', 'INFO', 'DEBUG'] as const
export type LogLevel = (typeof logLevelOrder)[number]

export const shouldLog = (fromSettings: LogLevel, forPurpose: Exclude<LogLevel, 'NONE'>): boolean => {
  if (fromSettings === 'NONE') {
    return false
  }

  return (
    logLevelOrder.findIndex((level) => level === forPurpose) <=
    logLevelOrder.findIndex((level) => level === fromSettings)
  )
}
