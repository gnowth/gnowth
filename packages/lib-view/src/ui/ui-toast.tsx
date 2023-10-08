import type { FunctionComponent, ReactNode } from 'react'

export interface VariantUIToast {
  as?: string
}

export interface PropsUIToast extends VariantUIToast {
  children: ReactNode
}

export const UIToast: FunctionComponent<PropsUIToast> = (props) => (
  <div className="ui-toast">{props.children}</div>
)
