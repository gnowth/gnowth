import type { FunctionComponent, ReactNode } from 'react'

export interface PropsUIDialog {
  as?: string
  children: ReactNode
}

export const UIDialog: FunctionComponent<PropsUIDialog> = (props) => (
  <div className="ui-dialog">{props.children}</div>
)
