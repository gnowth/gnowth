import type { FunctionComponent } from 'react'

export interface VariantInputSelect {
  as?: string
}

export interface PropsInputSelect {
  name?: string
}

export const InputSelect: FunctionComponent<PropsInputSelect> = (props) => (
  <input className="input-select" name={props.name} />
)
