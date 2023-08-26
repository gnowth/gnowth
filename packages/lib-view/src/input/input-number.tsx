import React from 'react'

export interface VariantInputNumber {
  as?: string
}

export interface PropsInputNumber {
  name?: string
}

const InputNumber: React.FunctionComponent<PropsInputNumber> = (props) => (
  <input className="input-number" name={props.name} />
)

export default InputNumber
