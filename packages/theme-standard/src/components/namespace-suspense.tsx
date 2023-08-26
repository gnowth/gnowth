import type { FunctionComponent } from 'react'
import React from 'react'
import { utils } from '@gnowth/lib-util'
import { PropsUIProgress, UIProgress } from '@gnowth/lib-view'

export { UIProgress as spinner } from '@gnowth/lib-view'

export const page: FunctionComponent<PropsUIProgress> = (props) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <UIProgress {...utils.defaults(props, { variant: 'page' })} />
)
