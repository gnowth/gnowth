import type { FunctionComponent, ReactNode } from 'react'

export interface PropsNavBreadcrumb {
  as?: string
  children: ReactNode
}

export const NavBreadcrumb: FunctionComponent<PropsNavBreadcrumb> = (props) => (
  <div className="nav-breadcrumb" data-testid="view-nav-breadcrumb">
    {props.children}
  </div>
)
