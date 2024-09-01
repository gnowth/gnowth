import type { SystemType } from '@gnowth/lib-theme'
import type { FunctionComponent, ReactNode } from 'react'

import { useAppTheme } from '@gnowth/lib-application'
import {
  cx,
  systemBox,
  systemColor,
  systemCompose,
  systemImage,
  systemLayout,
  systemPointer,
  systemSpace,
  themeStylesMake,
} from '@gnowth/lib-theme'
import * as R from 'remeda'

import type { PropsBase } from '../types'

type PropsUIBox = PropsBase<{ children: ReactNode } & SystemType<typeof uiBox>>

const uiBox = systemCompose(
  systemBox(),
  systemColor(),
  systemImage(),
  systemLayout(),
  systemPointer(),
  systemSpace(),
)
const makeStyles = themeStylesMake({ uiBox })
const propsDefault: Partial<PropsUIBox> = {
  variantNamespace: 'uiBox',
}

export const UIBox: FunctionComponent<PropsUIBox> = (props) => {
  const theme = useAppTheme()

  if (props.hidden) return null

  const propsVariant = theme.getPropsVariant(props, propsDefault)
  const styles = makeStyles(propsVariant, theme)

  return (
    <div
      className={cx(
        'ui-box',
        R.isString(propsVariant.variant) && `ui-box--${propsVariant.variant}`,
        propsVariant.className,
        styles.uiBox,
      )}
      id={propsVariant.id}
    >
      {propsVariant.children}
    </div>
  )
}
