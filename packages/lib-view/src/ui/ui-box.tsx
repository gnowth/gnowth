import { useAppTheme } from '@gnowth/lib-application'
import {
  cx,
  systemBox,
  systemColor,
  systemCompose,
  systemGrid,
  systemImage,
  systemLayout,
  systemPointer,
  systemSpace,
  SystemType,
  themeMakeStyles,
} from '@gnowth/lib-theme'
import { FunctionComponent, ReactNode } from 'react'
import * as R from 'remeda'

import { PropsBase } from '../types'

type PropsUIBox = PropsBase<SystemType<typeof uiBox> & { children?: ReactNode; 'data-testid'?: string }>

const uiBox = systemCompose(
  systemBox(),
  systemColor(),
  systemGrid(),
  systemImage(),
  systemLayout(),
  systemPointer(),
  systemSpace(),
)
const makeStyles = themeMakeStyles({ uiBox })
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
      data-testid={propsVariant['data-testid'] ?? 'view-ui-box'}
      id={propsVariant.id}
    >
      {propsVariant.children}
    </div>
  )
}
