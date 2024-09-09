// Note: see ant design. very similar to skeleton
import type { FunctionComponent, ReactNode } from 'react'

export interface PropsUIEmpty {
  as?: string
  children: ReactNode
}

export const UIEmpty: FunctionComponent<PropsUIEmpty> = (props) => (
  <div className="ui-empty" data-testid="view-ui-empty">
    {props.children}
  </div>
)
