import { FunctionComponent, ReactNode } from 'react'

export type PropsUICard = {
  as?: string
  children: ReactNode
}

export const UICard: FunctionComponent<PropsUICard> = (props) => (
  <div className="ui-card" data-testid="view-ui-card">
    {props.children}
  </div>
)
