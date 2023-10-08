import type { FunctionComponent, ReactNode } from 'react'

export interface VariantUIDialog {
  as?: string
}

export interface PropsUIDialog {
  children: ReactNode
}

export const UIDialog: FunctionComponent<PropsUIDialog> = (props) => (
  <div className="ui-dialog">{props.children}</div>
)
