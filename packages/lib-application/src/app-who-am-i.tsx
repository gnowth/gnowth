import { TokenError } from '@gnowth/lib-token'
import { UtilError } from '@gnowth/lib-util'

import useAppWhoAmI from './use-app-who-am-i'

interface Props {
  authenticated?: boolean
}

function AppWhoAmI(props: Props): null {
  const [whoami] = useAppWhoAmI()

  if (props.authenticated === undefined) return null
  if (!whoami) {
    if (props.authenticated) {
      throw new UtilError({
        message: 'You are not authorised to view this page',
        method: 'AppWhoAmI',
        package: '@gnowth/lib-application',
        type: [TokenError.api401, TokenError.api, TokenError.internal],
      })
    }

    return null
  }

  try {
    whoami.read()
  } catch (error) {
    if (props.authenticated) throw error

    return null
  }

  if (!props.authenticated) throw new Error('TODO: maybe they reached here by accident')

  return null
}

export default AppWhoAmI
