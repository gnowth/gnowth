// Note: see ant design. very similar to skeleton
import { FunctionComponent, ReactNode } from 'react'

export type PropsUIEmpty = {
  as?: string
  children: ReactNode
}

export const UIEmpty: FunctionComponent<PropsUIEmpty> = (props) => (
  <div className="ui-empty" data-testid="view-ui-empty">
    {props.children}
  </div>
)
