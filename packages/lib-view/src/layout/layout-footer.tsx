import type { FunctionComponent, ReactNode } from 'react'

export interface PropsLayoutFooter {
  as?: string
  children: ReactNode
  'data-testid'?: string
}

export const LayoutFooter: FunctionComponent<PropsLayoutFooter> = (props) => (
  <footer className="layout-footer" data-testid={props['data-testid']}>
    {props.children}
  </footer>
)
