import React from 'react'

export interface VariantUICarousel {
  as?: string
}

export interface PropsUICarousel {
  children: React.ReactNode
}

const UICarousel: React.FunctionComponent<PropsUICarousel> = (props) => (
  <div className="ui-carousel">{props.children}</div>
)

export default UICarousel
