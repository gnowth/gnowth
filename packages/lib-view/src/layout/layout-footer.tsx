import type { FunctionComponent, ReactNode } from 'react'

export interface VariantLayoutFooter {
  as?: string
}

export interface PropsLayoutFooter {
  children: ReactNode
}

export const LayoutFooter: FunctionComponent<PropsLayoutFooter> = (props) => (
  <footer className="layout-footer">{props.children}</footer>
)
