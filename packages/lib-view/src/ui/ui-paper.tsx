import type { SystemBox, SystemPalette, SystemSpace } from '@gnowth/lib-types'
import React from 'react'
import { useAppTheme } from '@gnowth/lib-application'
import {
  Theme,
  cx,
  systemBackgroundColorFromPalette,
  systemBox,
  systemCompose,
  systemSpace,
} from '@gnowth/lib-theme'
import { TokenSpace } from '@gnowth/lib-token'
import { guardString } from '@gnowth/lib-utils'

type SystemUIPapper = SystemBox & SystemPalette & SystemSpace

export interface VariantUIPaper extends SystemUIPapper {
  boxVariant?: string
  boxVariantNamespace?: string
}

export interface PropsUIPaper extends VariantUIPaper {
  children: React.ReactNode
  className?: string
  hidden?: boolean
  id?: string
  slot?: string
  variant?: VariantUIPaper | string
  variantNamespace?: string
}

const makeStyles = Theme.makeStyles({
  uiPaper: systemCompose<PropsUIPaper>(systemBackgroundColorFromPalette(), systemBox(), systemSpace()),
})

const definitions = Theme.makeDefinitions(['', 'box'])

const propsDefault = {
  boxVariant: 'float',
  boxVariantNamespace: 'systemBox',
  padding: TokenSpace.md,
  variantNamespace: 'uiPaper',
}

export const UIPaper: React.FunctionComponent<PropsUIPaper> = (props) => {
  const theme = useAppTheme()

  if (props.hidden) return null

  const variant = theme.getVariantByDefinitions(definitions, props, propsDefault)
  const styles = makeStyles(variant, theme)

  return (
    <div
      className={cx(
        'ui-paper',
        guardString(variant.variant) && `ui-paper--${variant.variant}`,
        variant.className,
        styles.uiPaper,
      )}
      id={variant.id}
    >
      {props.children}
    </div>
  )
}
