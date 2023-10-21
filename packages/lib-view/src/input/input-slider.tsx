import type { FunctionComponent } from 'react'

export interface PropsInputSlider {
  as?: string
  name?: string
}

export const InputSlider: FunctionComponent<PropsInputSlider> = (props) => (
  <input className="input-slider" name={props.name} />
)
