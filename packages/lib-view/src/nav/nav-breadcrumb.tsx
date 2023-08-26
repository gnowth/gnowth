import React from 'react'

export interface VariantNavBreadcrumb {
  as?: string
}

export interface PropsNavBreadcrumb {
  children: React.ReactNode
}

const NavBreadcrumb: React.FunctionComponent<PropsNavBreadcrumb> = (props) => (
  <div className="nav-breadcrumb">{props.children}</div>
)

export default NavBreadcrumb
