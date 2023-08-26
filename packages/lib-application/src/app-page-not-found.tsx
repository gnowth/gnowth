import { TokenError } from '@gnowth/lib-token'
import { UtilError } from '@gnowth/lib-util'

function AppPageNotFound(): never {
  throw new UtilError({
    message: 'Page not found',
    method: 'AppPageNotFound',
    package: '@gnowth/lib-application',
    type: [TokenError.api404, TokenError.internal],
  })
}

export default AppPageNotFound
