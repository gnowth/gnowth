import { FunctionComponent, ReactNode } from 'react'

export type PropsUIButtonGroup = {
  as?: string
  children: ReactNode
}

export const UIButtonGroup: FunctionComponent<PropsUIButtonGroup> = (props) => (
  <div className="ui-button-group" data-testid="view-ui-button-group">
    {props.children}
  </div>
)
