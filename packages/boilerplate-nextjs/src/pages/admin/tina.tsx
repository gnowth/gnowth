import type { ReactNode } from 'react'
import { PageAdmin } from '@app/recipe'

interface Props {
  children: ReactNode
}

function PageTinaAdmin() {
  return <PageAdmin />
}

PageTinaAdmin.Layout = (props: Props) => props.children

export default PageTinaAdmin
