import React from 'react'

export interface VariantInputMention {
  as?: string
}

export interface PropsInputMention {
  name?: string
}

const InputMention: React.FunctionComponent<PropsInputMention> = (props) => (
  <input className="input-mention" name={props.name} />
)

export default InputMention