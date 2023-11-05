import { TokenErrorType, ErrorCustom } from '@gnowth/lib-utils'

import { useAppWhoAmI } from './use-app-who-am-i'

interface Props {
  authenticated?: boolean
}

export function AppWhoAmI(props: Props): null {
  const [whoami] = useAppWhoAmI()

  if (props.authenticated === undefined) return null
  if (!whoami) {
    if (props.authenticated) {
      throw new ErrorCustom({
        code: 'lib-application--app-who-am-i--01',
        message: 'You are not authorised to view this page',
        trace: {
          caller: 'AppWhoAmI',
          context: 'AppWhoAmI',
          source: 'lib-application',
        },
        type: [TokenErrorType.api401, TokenErrorType.api, TokenErrorType.internal],
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
