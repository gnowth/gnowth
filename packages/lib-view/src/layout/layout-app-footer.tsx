import type { FunctionComponent, ReactNode } from 'react'

export interface PropsLayoutAppFooter {
  as?: string
  children: ReactNode
  'data-testid'?: string
}

export const LayoutAppFooter: FunctionComponent<PropsLayoutAppFooter> = (props) => (
  <footer className="layout-app-footer" data-testid={props['data-testid']}>
    {props.children}
  </footer>
)