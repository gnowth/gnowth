import type { FunctionComponent, ReactNode } from 'react'
import { useAppTheme } from '@gnowth/lib-application'
import { TokenSpace } from '@gnowth/lib-token'

import { UtilSlot } from '../util/util-slot'
import { LayoutContent } from './layout-content'
import { LayoutFlex } from './layout-flex'

export interface VariantLayoutData {
  spacing?: string | number
  wrapperVariant?: string
}

export interface PropsLayoutData extends VariantLayoutData {
  children: ReactNode
  // eslint-disable-next-line @typescript-eslint/ban-types
  variant?: object | string
}

const variants = {
  block: {
    wrapperVariant: 'verticalStretch',
  },

  inlineLabel: {
    wrapperVariant: 'horizontalLeft',
  },

  inlineLabelRight: {
    wrapperVariant: 'horizontalReverseLeft',
  },
}

const propsDefault = {
  spacing: TokenSpace.xxs,
  variant: 'block',
  variantNamespace: 'layoutData',
  variants,
}

export const LayoutData: FunctionComponent<PropsLayoutData> = (props) => {
  const theme = useAppTheme()
  const variant = theme.getVariant(props, propsDefault)

  return (
    <UtilSlot.Provider slots={props.children}>
      <LayoutFlex className="layout-data" spacing={variant.spacing} variant="verticalStretch">
        <LayoutFlex
          className="layout-data__content-wrapper"
          spacing={variant.spacing}
          variant={variant.wrapperVariant}
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
