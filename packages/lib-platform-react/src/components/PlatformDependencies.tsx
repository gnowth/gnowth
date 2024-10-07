import { PlatformDefinition } from '@gnowth/lib-platform'
import { FunctionComponent } from 'react'

import { usePlatformDependencies } from '../hooks/use-platform'

type Props = { definitions: PlatformDefinition[] }
export const PlatformDependencies: FunctionComponent<Props> = (props) => {
  usePlatformDependencies(props.definitions)
  return null
}
