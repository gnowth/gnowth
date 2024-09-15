import { useAppTheme } from '@gnowth/lib-application'
import {
  SystemType,
  ThemeVariants,
  TokenSize,
  cx,
  systemBox,
  systemColor,
  systemColorFromPalette,
  systemCompose,
  systemImage,
  systemLayout,
  systemSpace,
  themeMakeStyles,
} from '@gnowth/lib-theme'
import { imageExists } from '@gnowth/lib-utils'
import { ComponentProps, ComponentType, FunctionComponent } from 'react'
import { useAsync } from 'react-use'
import * as R from 'remeda'

import { LayoutFlex } from '../exports'
import { PropsBase } from '../types'
import { UIIcon } from './ui-icon'
import { UIImage } from './ui-image'
import { UITypography } from './ui-typography'

type PropsUIAvatar = PropsBase<
  {
    as?: string
    boxVariant?: string
    boxVariantNamespace?: string
    icon?: ComponentType<ComponentProps<typeof UIIcon>> | string
    iconClassName?: string
    iconSize?: TokenSize
    iconValue?: string
    iconVariant?: string
    name?: string
    size?: TokenSize
    src?: string
    text?: ComponentType<ComponentProps<typeof UITypography>> | string
    textClassName?: string
    textProps?: ComponentProps<typeof UITypography>
    textVariant?: string
  } & SystemType<ReturnType<typeof systemColorFromPalette>> &
    SystemType<typeof uiAvatar>
>

const uiAvatar = systemCompose(
  systemBox(),
  systemColor(),
  systemColorFromPalette(),
  systemImage(),
  systemLayout(),
  systemSpace(),
)
const makeStyles = themeMakeStyles({ uiAvatar })
const variants: ThemeVariants<PropsUIAvatar> = {
  circular: (props) => {
    const height = props.theme.getScaleItem({ scale: 'buttonSize', scaleToken: props.size })
    return {
      background: props.theme.getPaletteColor(props),
      height,
      overflow: 'hidden',
      width: height,
    }
  },
}
const propsDefault: Partial<PropsUIAvatar> = {
  boxVariant: 'circular',
  boxVariantNamespace: 'systemBox',
  iconSize: 'md',
  iconValue: 'accountCircle',
  palette: 'primary',
  paletteWeight: '400',
  size: 'md',
  textVariant: 'overline',
  variant: 'circular',
  variantComposition: ['box'],
  variantNamespace: 'uiAvatar',
  variants,
}

export const UIAvatar: FunctionComponent<PropsUIAvatar> = (props) => {
  const theme = useAppTheme()
  const propsVariant = theme.getPropsVariant(props, propsDefault)
  const existState = useAsync(async () => !!propsVariant.src && imageExists(propsVariant.src))

  if (props.hidden) return null

  const styles = makeStyles(propsVariant, theme)
  const ComponentIcon = theme.getComponent({ component: propsVariant.icon }) || UIIcon
  const ComponentTypography = theme.getComponent({ component: propsVariant.text }) || UITypography
  const initial = R.pipe(
    propsVariant.name ?? '',
    R.split(' '),
    R.map((n) => n[0]),
    R.take(2),
    R.join(''),
  )
  const hasImage = propsVariant.src && existState.value
  const hasText = !hasImage && !!initial
  const showFallback = !hasText && !hasImage

  return (
    <LayoutFlex
      className={cx(
        'ui-avatar',
        R.isString(propsVariant.variant) && `ui-avatar--${propsVariant.variant}`,
        propsVariant.className,
        styles.uiAvatar,
      )}
      data-testid="view-ui-avatar"
      variant="horizontalCenter"
    >
      {hasImage && propsVariant.src && <UIImage src={propsVariant.src} />}
      {hasText && (
        <ComponentTypography
          className={cx(
            'ui-avatar--text',
            propsVariant.classNamespace && `${propsVariant.classNamespace}--text`,
            propsVariant.textClassName,
          )}
          id={propsVariant.id && `${propsVariant.id}--text`}
          palette={propsVariant.palette}
          paletteForContrast
          paletteWeight={propsVariant.paletteWeight}
          slot="text"
          value={initial}
          variant={propsVariant.textVariant}
        />
      )}
      {showFallback && (
        <ComponentIcon
          className={cx(
            'ui-avatar--icon',
            propsVariant.classNamespace && `${propsVariant.classNamespace}--icon`,
            propsVariant.iconClassName,
          )}
          id={propsVariant.id && `${propsVariant.id}--icon`}
          palette={propsVariant.palette}
          paletteForContrast
          paletteWeight={propsVariant.paletteWeight}
          size={propsVariant.iconSize}
          slot="icon"
          value={propsVariant.iconValue}
          variant={propsVariant.iconVariant}
        />
      )}
    </LayoutFlex>
  )
}
