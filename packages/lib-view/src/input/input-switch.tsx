import type { FunctionComponent } from 'react'

export interface VariantInputSwitch {
  as?: string
}

export interface PropsInputSwitch {
  name?: string
}

export const InputSwitch: FunctionComponent<PropsInputSwitch> = (props) => (
  <input className="input-switch" name={props.name} />
)
