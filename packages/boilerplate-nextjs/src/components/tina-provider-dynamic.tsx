import type { ReactNode } from 'react'
import { TinaEditProvider } from 'tinacms/dist/edit-state'
import dynamic from 'next/dynamic'

interface Props {
  children: ReactNode
}

const TinaProvider = dynamic(() => import('./tina-provider'), { ssr: false })

function TinaProviderDynamic({ children }: Props) {
  return <TinaEditProvider editMode={<TinaProvider>{children}</TinaProvider>}>{children}</TinaEditProvider>
}

export default TinaProviderDynamic
