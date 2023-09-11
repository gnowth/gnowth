import React from 'react'

export interface VariantUIAvatar {
  as?: string
}

export interface PropsUIAvatar {
  children: React.ReactNode
}

export const UIAvatar: React.FunctionComponent<PropsUIAvatar> = (props) => (
  <div className="ui-avatar">{props.children}</div>
)
