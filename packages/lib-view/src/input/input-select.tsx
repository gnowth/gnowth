import type { FunctionComponent } from 'react'

export interface PropsInputSelect {
  as?: string
  name?: string
}

export const InputSelect: FunctionComponent<PropsInputSelect> = (props) => (
  <input className="input-select" name={props.name} />
)
