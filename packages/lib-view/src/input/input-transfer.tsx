import React from 'react'

export interface VariantInputTransfer {
  as?: string
}

export interface PropsInputTransfer {
  name?: string
}

// Note: see materialui transfer list
const InputTransfer: React.FunctionComponent<PropsInputTransfer> = (props) => (
  <input className="input-transfer" name={props.name} />
)

export default InputTransfer
