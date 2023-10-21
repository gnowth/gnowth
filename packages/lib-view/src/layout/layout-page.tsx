import type { FunctionComponent, ReactNode } from 'react'

export interface PropsLayoutPage {
  as?: string
  children: ReactNode
}

export const LayoutPage: FunctionComponent<PropsLayoutPage> = (props) => (
  <div className="layout-page">{props.children}</div>
)
