import { FunctionComponent, ReactNode } from 'react'

export type PropsUIChip = {
  as?: string
  children: ReactNode
}

export const UIChip: FunctionComponent<PropsUIChip> = (props) => (
  <div className="ui-chip" data-testid="view-ui-chip">
    {props.children}
  </div>
)
