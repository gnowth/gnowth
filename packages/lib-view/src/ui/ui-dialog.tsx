import { FunctionComponent, ReactNode } from 'react'

export type PropsUIDialog = {
  as?: string
  children: ReactNode
}

export const UIDialog: FunctionComponent<PropsUIDialog> = (props) => (
  <div className="ui-dialog" data-testid="view-ui-dialog">
    {props.children}
  </div>
)
