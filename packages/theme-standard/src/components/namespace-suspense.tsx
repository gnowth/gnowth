import type { FunctionComponent } from 'react'
import { objectDefaults } from '@gnowth/lib-utils'
import { PropsUIProgress, UIProgress } from '@gnowth/lib-view'

export { UIProgress as spinner } from '@gnowth/lib-view'

export const page: FunctionComponent<PropsUIProgress> = (props) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <UIProgress {...objectDefaults(props, { variant: 'page' })} />
)
