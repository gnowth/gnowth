import React from 'react'

export interface VariantInputSlider {
  as?: string
}

export interface PropsInputSlider {
  name?: string
}

export const InputSlider: React.FunctionComponent<PropsInputSlider> = (props) => (
  <input className="input-slider" name={props.name} />
)
