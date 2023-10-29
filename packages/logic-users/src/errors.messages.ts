import { TokenErrorInternal, TokenErrorValidation } from './errors.tokens'

export const errorMessagesValidation = {
  [TokenErrorValidation.VA0000]: 'Invalid data received',
  [TokenErrorValidation.VA0001]: 'Field ({{field}}) data is required',
}

export const errorMessagesInternal = {
  [TokenErrorInternal.IN0000]: 'Unable to create valid {{entity}}',
  [TokenErrorInternal.IN0001]: 'Service {{service}} is not available',
}
