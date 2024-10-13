import { useAppTheme } from '@gnowth/lib-application'
import {
  SystemType,
  cx,
  systemBackgroundColorFromPalette,
  systemBox,
  systemCompose,
  systemSpace,
  themeMakeStyles,
} from '@gnowth/lib-theme'
import { FunctionComponent, ReactNode } from 'react'
import * as R from 'remeda'

export type PropsUIPaper = {
  boxVariant?: string
  boxVariantNamespace?: string
  children: ReactNode
  className?: string
  hidden?: boolean
  id?: string
  slot?: string
  variant?: PropsUIPaper | string
  variantComposition?: string[]
  variantNamespace?: string
} & SystemType<typeof uiPaper>

const uiPaper = systemCompose(systemBackgroundColorFromPalette(), systemBox(), systemSpace())
const makeStyles = themeMakeStyles({ uiPaper })
const propsDefault: Partial<PropsUIPaper> = {
  boxVariant: 'float',
  boxVariantNamespace: 'systemBox',
  padding: 'md',
  variantComposition: ['box'],
  variantNamespace: 'uiPaper',
}

export const UIPaper: FunctionComponent<PropsUIPaper> = (props) => {
  const theme = useAppTheme()

  if (props.hidden) return null

  const propsVariant = theme.getPropsVariant(props, propsDefault)
  const styles = makeStyles(propsVariant, theme)

  return (
    <div
      className={cx(
        'ui-paper',
        R.isString(propsVariant.variant) && `ui-paper--${propsVariant.variant}`,
        propsVariant.className,
        styles.uiPaper,
      )}
      data-testid="view-ui-paper"
      id={propsVariant.id}
    >
      {props.children}
    </div>
  )
}
