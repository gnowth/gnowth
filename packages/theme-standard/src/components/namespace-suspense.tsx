import { PropsUIProgress, UIProgress } from '@gnowth/lib-view'
import { FunctionComponent } from 'react'
import * as R from 'remeda'

export { UIProgress as spinner } from '@gnowth/lib-view'

export const page: FunctionComponent<PropsUIProgress> = (props) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <UIProgress {...R.merge({ variant: 'page' }, props)} />
)
