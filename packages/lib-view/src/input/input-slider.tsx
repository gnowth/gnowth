import React from 'react'

export interface VariantInputSlider {
  as?: string
}

export interface PropsInputSlider {
  name?: string
}

const InputSlider: React.FunctionComponent<PropsInputSlider> = (props) => (
  <input className="input-slider" name={props.name} />
)

export default InputSlider
