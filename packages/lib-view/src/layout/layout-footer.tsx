import type { FunctionComponent, ReactNode } from 'react'

export interface PropsLayoutFooter {
  as?: string
  children: ReactNode
}

export const LayoutFooter: FunctionComponent<PropsLayoutFooter> = (props) => (
  <footer className="layout-footer">{props.children}</footer>
)
