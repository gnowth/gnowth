import type { ReactNode } from 'react'
import TinaCMS from 'tinacms'

import { configsTina } from '../configs'

interface Props {
  children: ReactNode
}

function TinaProvider(props: Props) {
  // DEBT (hack): there seem to be an miss match of types here.
  const propsTina = configsTina as { client: never }

  return <TinaCMS {...propsTina}>{props.children}</TinaCMS>
}

export default TinaProvider
