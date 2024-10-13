import { FunctionComponent, ReactNode } from 'react'

export type PropsUIAlert = {
  as?: string
  children: ReactNode
}

export const UIAlert: FunctionComponent<PropsUIAlert> = (props) => (
  <div className="ui-alert" data-testid="view-ui-alert">
    {props.children}
  </div>
)
