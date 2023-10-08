import type { ComponentType, ReactElement, ReactNode } from 'react'
import { objectDefaults } from '@gnowth/lib-utils'

import type { PropsLayout } from './types'
import { useAppLayout } from './use-app-layout'

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
export function AppLayout(props: Props): ReactElement {
  const LayoutComponent = useAppLayout(props.layout)

  if (!LayoutComponent) return <>{props.children}</>

  const propsCombined = objectDefaults(
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
