import type { UtilNamespaced } from '@gnowth/lib-utils'
import type { FunctionComponent, ReactNode } from 'react'
import { useAppTheme } from '@gnowth/lib-application'

import { UtilSlot } from '../util/util-slot'
import { LayoutContent } from './layout-content'
import { LayoutFlex } from './layout-flex'

export interface PropsLayoutData {
  children: ReactNode
  spacing?: string | number
  variant?: PropsLayoutData | string
  variants?: UtilNamespaced<Partial<PropsLayoutData>>
  variantNamespace?: string
  wrapperVariant?: string
}

const variants = {
  block: { wrapperVariant: 'verticalStretch' },
  inlineLabel: { wrapperVariant: 'horizontalLeft' },
  inlineLabelRight: { wrapperVariant: 'horizontalReverseLeft' },
}
const propsDefault: Partial<PropsLayoutData> = {
  spacing: 'xxs',
  variant: 'block',
  variantNamespace: 'layoutData',
  variants,
}

export const LayoutData: FunctionComponent<PropsLayoutData> = (props) => {
  const theme = useAppTheme()
  const propsVariant = theme.getVariant(props, propsDefault)

  return (
    <UtilSlot.Provider slots={props.children}>
      <LayoutFlex className="layout-data" spacing={propsVariant.spacing} variant="verticalStretch">
        <LayoutFlex
          className="layout-data__content-wrapper"
          spacing={propsVariant.spacing}
          variant={propsVariant.wrapperVariant}
        >
          <UtilSlot.Content name="label" />

          <LayoutContent className="layout-data__content" flexGrow="1">
            <UtilSlot.Content name="input" />
          </LayoutContent>
        </LayoutFlex>

        <UtilSlot.Content name="warning" />
      </LayoutFlex>
    </UtilSlot.Provider>
  )
}
