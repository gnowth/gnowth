import React from 'react'

export interface VariantInputEnum {
  as?: string
}

export interface PropsInputEnum {
  name?: string
}

const InputEnum: React.FunctionComponent<PropsInputEnum> = (props) => (
  <input className="input-enum" name={props.name} />
)

export default InputEnum
