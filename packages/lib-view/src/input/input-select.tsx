import React from 'react'

export interface VariantInputSelect {
  as?: string
}

export interface PropsInputSelect {
  name?: string
}

export const InputSelect: React.FunctionComponent<PropsInputSelect> = (props) => (
  <input className="input-select" name={props.name} />
)
