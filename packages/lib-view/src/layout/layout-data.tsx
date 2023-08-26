import React from 'react'
import { useAppTheme } from '@gnowth/lib-application'
import { TokenSpace } from '@gnowth/lib-token'
import { UtilSlot } from '@gnowth/lib-util'

import LayoutContent from './layout-content'
import LayoutFlex from './layout-flex'

export interface VariantLayoutData {
  spacing?: string | number
  wrapperVariant?: string
}

export interface PropsLayoutData extends VariantLayoutData {
  children: React.ReactNode
  // eslint-disable-next-line @typescript-eslint/ban-types
  variant?: object | string
}

const variantLocals = {
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
  variantLocals,
  spacing: TokenSpace.xxs,
  variant: 'block',
  variantNamespace: 'layoutData',
}

const LayoutData: React.FunctionComponent<PropsLayoutData> = (props) => {
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
          <UtilSlot name="label" />

          <LayoutContent className="layout-data__content" flexGrow="1">
            <UtilSlot name="input" />
          </LayoutContent>
        </LayoutFlex>

        <UtilSlot name="warning" />
      </LayoutFlex>
    </UtilSlot.Provider>
  )
}

export default LayoutData
