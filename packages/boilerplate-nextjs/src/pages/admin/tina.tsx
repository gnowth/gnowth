import type { ReactNode } from 'react'
import { PageAdmin } from '@gnowth/recipes-app'

interface Props {
  children: ReactNode
}

function PageTinaAdmin() {
  return <PageAdmin />
}

PageTinaAdmin.Layout = (props: Props) => props.children

export default PageTinaAdmin
