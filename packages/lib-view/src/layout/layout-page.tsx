import { FunctionComponent, ReactNode } from 'react'

export type PropsLayoutPage = {
  as?: string
  children: ReactNode
}

export const LayoutPage: FunctionComponent<PropsLayoutPage> = (props) => (
  <div className="layout-page" data-testid="view-layout-page">
    {props.children}
  </div>
)
