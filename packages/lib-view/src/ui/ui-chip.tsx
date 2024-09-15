import { FunctionComponent, ReactNode } from 'react'

export interface PropsUIChip {
  as?: string
  children: ReactNode
}

export const UIChip: FunctionComponent<PropsUIChip> = (props) => (
  <div className="ui-chip" data-testid="view-ui-chip">
    {props.children}
  </div>
)
