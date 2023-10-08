import type { FunctionComponent, ReactNode } from 'react'

export interface VariantLayoutPage {
  as?: string
}

export interface PropsLayoutPage {
  children: ReactNode
}

export const LayoutPage: FunctionComponent<PropsLayoutPage> = (props) => (
  <div className="layout-page">{props.children}</div>
)
