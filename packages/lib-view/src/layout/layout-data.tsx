import type { UtilNamespaced } from '@gnowth/lib-utils'
import type { ComponentProps, FunctionComponent, ReactNode } from 'react'

import { useAppTheme } from '@gnowth/lib-application'

import { UtilSlot } from '../util/util-slot'
import { LayoutContent } from './layout-content'
import { LayoutFlex } from './layout-flex'

export interface PropsLayoutData {
  children: ReactNode
  gap?: ComponentProps<typeof LayoutFlex>['gap']
  variant?: PropsLayoutData | string
  variantNamespace?: string
  variants?: UtilNamespaced<Partial<PropsLayoutData>>
  wrapperVariant?: string
}

const variants = {
  block: { wrapperVariant: 'verticalStretch' },
  inlineLabel: { wrapperVariant: 'horizontalLeft' },
  inlineLabelRight: { wrapperVariant: 'horizontalReverseLeft' },
}
const propsDefault: Partial<PropsLayoutData> = {
  gap: 'xxs',
  variant: 'block',
  variantNamespace: 'layoutData',
  variants,
}

export const LayoutData: FunctionComponent<PropsLayoutData> = (props) => {
  const theme = useAppTheme()
  const propsVariant = theme.getPropsVariant(props, propsDefault)

  return (
    <UtilSlot.Provider slots={props.children}>
      <LayoutFlex className="layout-data" gap={propsVariant.gap} variant="verticalStretch">
        <LayoutFlex
          className="layout-data--content-wrapper"
          gap={propsVariant.gap}
          variant={propsVariant.wrapperVariant}
        >
          <UtilSlot.Content name="label" />

          <LayoutContent className="layout-data--content" flexGrow="1">
            <UtilSlot.Content name="input" />
          </LayoutContent>
        </LayoutFlex>

        <UtilSlot.Content name="warning" />
      </LayoutFlex>
    </UtilSlot.Provider>
  )
}
