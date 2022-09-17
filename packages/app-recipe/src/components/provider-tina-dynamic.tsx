import type { FunctionComponent, ReactNode } from 'react'
import { TinaEditProvider } from 'tinacms/dist/edit-state'
import dynamic from 'next/dynamic'

interface Props {
  children: ReactNode
}

const TinaProvider = dynamic(() => import('./provider-tina'), { ssr: false })

export const ProviderTinaDynamic: FunctionComponent<Props> = (props) => {
  return (
    <TinaEditProvider editMode={<TinaProvider>{props.children}</TinaProvider>}>
      {props.children}
    </TinaEditProvider>
  )
}
