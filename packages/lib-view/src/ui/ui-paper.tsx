import type { SystemType } from '@gnowth/lib-theme'
import type { FunctionComponent, ReactNode } from 'react'
import { useAppTheme } from '@gnowth/lib-application'
import {
  cx,
  systemBackgroundColorFromPalette,
  systemBox,
  systemCompose,
  systemSpace,
  themeDefinitionsMake,
  themeStylesMake,
} from '@gnowth/lib-theme'
import { TokenSpace } from '@gnowth/lib-token'
import { guardString } from '@gnowth/lib-utils'

const uiPaper = systemCompose(systemBackgroundColorFromPalette(), systemBox(), systemSpace())

export interface VariantUIPaper extends SystemType<typeof uiPaper> {
  boxVariant?: string
  boxVariantNamespace?: string
}

export interface PropsUIPaper extends VariantUIPaper {
  children: ReactNode
  className?: string
  hidden?: boolean
  id?: string
  slot?: string
  variant?: VariantUIPaper | string
  variantNamespace?: string
}

const makeStyles = themeStylesMake({ uiPaper })
const definitions = themeDefinitionsMake(['', 'box'])

const propsDefault = {
  boxVariant: 'float',
  boxVariantNamespace: 'systemBox',
  padding: TokenSpace.md,
  variantNamespace: 'uiPaper',
}

export const UIPaper: FunctionComponent<PropsUIPaper> = (props) => {
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
