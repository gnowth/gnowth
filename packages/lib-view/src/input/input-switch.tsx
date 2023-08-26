import React from 'react'

export interface VariantInputSwitch {
  as?: string
}

export interface PropsInputSwitch {
  name?: string
}

const InputSwitch: React.FunctionComponent<PropsInputSwitch> = (props) => (
  <input className="input-switch" name={props.name} />
)

export default InputSwitch
