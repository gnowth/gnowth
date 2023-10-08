import type { FunctionComponent, ReactNode } from 'react'

export interface VariantUIAvatar {
  as?: string
}

export interface PropsUIAvatar {
  children: ReactNode
}

export const UIAvatar: FunctionComponent<PropsUIAvatar> = (props) => (
  <div className="ui-avatar">{props.children}</div>
)
