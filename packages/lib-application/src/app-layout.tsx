import type { PropsLayout } from '@gnowth/lib-types'
import type { ComponentType, ReactElement, ReactNode } from 'react'
import React from 'react'
import { utils } from '@gnowth/lib-util'

import useAppLayout from './use-app-layout'

interface Props {
  className?: string
  classNameRoot?: string
  children: ReactNode
  id?: string
  layout?: ComponentType<PropsLayout> | string
  layoutProps?: Record<string, unknown>
  layoutSpacing?: string | number
  layoutVariant?: string
  slot?: string
}

// TODO: changing layout, can be a place that require transition
function AppLayout(props: Props): ReactElement {
  const LayoutComponent = useAppLayout(props.layout)

  if (!LayoutComponent) return <>{props.children}</>

  const propsCombined = utils.defaults(
    {
      className: props.className,
      classNameRoot: props.classNameRoot,
      id: props.id,
      spacing: props.layoutSpacing,
      variant: props.layoutVariant,
    },
    props.layoutProps,
  )

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <LayoutComponent {...propsCombined}>{props.children}</LayoutComponent>
  )
}

export default AppLayout
