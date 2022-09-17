import type { FunctionComponent, ReactNode } from 'react'
import TinaCMS from 'tinacms'

import { configs } from '../configs'

interface Props {
  children: ReactNode
}

const ProviderTina: FunctionComponent<Props> = (props) => {
  return (
    <TinaCMS client={configs.client} schema={configs.schema}>
      {props.children}
    </TinaCMS>
  )
}

// Note default export since it will be dynamically imported
export default ProviderTina
