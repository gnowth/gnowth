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
import { guardString } from '@gnowth/lib-utils'

export interface PropsUIPaper extends SystemType<typeof uiPaper> {
  boxVariant?: string
  boxVariantNamespace?: string
  children: ReactNode
  className?: string
  hidden?: boolean
  id?: string
  slot?: string
  variant?: PropsUIPaper | string
  variantNamespace?: string
}

const uiPaper = systemCompose(systemBackgroundColorFromPalette(), systemBox(), systemSpace())
const makeStyles = themeStylesMake({ uiPaper })
const definitions = themeDefinitionsMake(['', 'box'])
const propsDefault: Partial<PropsUIPaper> = {
  boxVariant: 'float',
  boxVariantNamespace: 'systemBox',
  padding: 'md',
  variantNamespace: 'uiPaper',
}

export const UIPaper: FunctionComponent<PropsUIPaper> = (props) => {
  const theme = useAppTheme()

  if (props.hidden) return null

  const propsVariant = theme.getPropsVariantByDefinitions(definitions, props, propsDefault)
  const styles = makeStyles(propsVariant, theme)

  return (
    <div
      className={cx(
        'ui-paper',
        guardString(propsVariant.variant) && `ui-paper--${propsVariant.variant}`,
        propsVariant.className,
        styles.uiPaper,
      )}
      id={propsVariant.id}
    >
      {props.children}
    </div>
  )
}
