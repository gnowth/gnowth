import type { ReactNode } from 'react'
import { PageAdmin } from '@app/recipes'

interface Props {
  children: ReactNode
}

function PageTinaAdmin() {
  return <PageAdmin />
}

PageTinaAdmin.Layout = (props: Props) => props.children

export default PageTinaAdmin
