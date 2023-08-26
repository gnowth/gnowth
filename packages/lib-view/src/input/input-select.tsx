import React from 'react'

export interface VariantInputSelect {
  as?: string
}

export interface PropsInputSelect {
  name?: string
}

const InputSelect: React.FunctionComponent<PropsInputSelect> = (props) => (
  <input className="input-select" name={props.name} />
)

export default InputSelect
