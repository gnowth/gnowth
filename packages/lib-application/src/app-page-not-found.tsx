import { TokenErrorType, ErrorCustom } from '@gnowth/lib-utils'

export function AppPageNotFound(): never {
  throw new ErrorCustom({
    code: 'lib-application--app-page-not-found--01',
    message: 'Page not found',
    trace: {
      caller: 'AppPageNotFound',
      context: 'AppPageNotFound',
      source: 'lib-application',
    },
    type: [TokenErrorType.api404, TokenErrorType.internal],
  })
}
