import type { ReactNode } from 'react'
import { TinaAdmin } from 'tinacms'

interface Props {
  children: ReactNode
}

function PageTinaAdmin() {
  return <TinaAdmin />
}

PageTinaAdmin.Layout = (props: Props) => props.children

export default PageTinaAdmin
