import type { FunctionComponent, ReactNode } from 'react'

export interface VariantNavBreadcrumb {
  as?: string
}

export interface PropsNavBreadcrumb {
  children: ReactNode
}

export const NavBreadcrumb: FunctionComponent<PropsNavBreadcrumb> = (props) => (
  <div className="nav-breadcrumb">{props.children}</div>
)
