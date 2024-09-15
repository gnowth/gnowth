import { FunctionComponent, ReactNode } from 'react'

export interface PropsUIPlaceholder {
  as?: string
  children?: ReactNode
  hidden?: boolean
}

export const UIPlaceholder: FunctionComponent<PropsUIPlaceholder> = (props) => (
  <div className="ui-placeholder" data-testid="view-ui-placeholder">
    {props.children}
  </div>
)
