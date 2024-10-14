import { objectDefaults } from '@gnowth/lib-utils'
import { ComponentType, FunctionComponent, ReactNode } from 'react'

import { PropsLayout } from './types'
import { useAppLayout } from './use-app-layout'

// TODO: check whether we need layoutProps, can it be layoutVariant with object or vice versa
type Props = {
  children: ReactNode
  className?: string
  classNamespace?: string
  id?: string
  layout?: ComponentType<PropsLayout> | string
  layoutProps?: Record<string, unknown>
  layoutVariant?: string
  slot?: string
}

// TODO: changing layout, can be a place that require transition
export const AppLayout: FunctionComponent<Props> = (props) => {
  const LayoutComponent = useAppLayout(props.layout)

  if (!LayoutComponent) return <>{props.children}</>

  const propsCombined = objectDefaults(
    {
      className: props.className,
      classNamespace: props.classNamespace,
      id: props.id,
      variant: props.layoutVariant,
    },
    props.layoutProps ?? {},
  )

  return <LayoutComponent {...propsCombined}>{props.children}</LayoutComponent>
}
