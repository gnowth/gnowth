import { FunctionComponent, ReactNode } from 'react'

export type PropsLayoutAppFooter = {
  as?: string
  children: ReactNode
  'data-testid'?: string
}

export const LayoutAppFooter: FunctionComponent<PropsLayoutAppFooter> = (props) => (
  <footer className="layout-app-footer" data-testid={props['data-testid'] ?? 'view-layout-app-footer'}>
    {props.children}
  </footer>
)
