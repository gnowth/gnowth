import { FunctionComponent, ReactNode } from 'react'

export type PropsUITooltip = {
  as?: string
  children: ReactNode
}

export const UITooltip: FunctionComponent<PropsUITooltip> = (props) => (
  <div className="ui-tooltip" data-testid="view-ui-tooltip">
    {props.children}
  </div>
)
