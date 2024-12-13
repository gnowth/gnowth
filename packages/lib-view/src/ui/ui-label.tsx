import { useAppTheme } from '@gnowth/lib-application'
import { PropsDataReadonly } from '@gnowth/lib-data'
import {
  cx,
  systemColorFromPalette,
  systemCompose,
  systemSpace,
  SystemType,
  systemTypography,
  themeMakeStyles,
} from '@gnowth/lib-theme'
import { FunctionComponent } from 'react'
import * as R from 'remeda'

export type PropsUILabel = PropsDataReadonly<string> &
  SystemType<typeof uiLabel> & {
    className?: string
    hidden?: boolean
    slot?: string
    typographyVariant?: string
    typographyVariantNamespace?: string
    variant?: PropsUILabel | string
    variantComposition?: string[]
    variantNamespace?: string
  }

const uiLabel = systemCompose(systemColorFromPalette(), systemSpace(), systemTypography())
const makeStyles = themeMakeStyles({ uiLabel })
const propsDefault: Partial<PropsUILabel> = {
  typographyVariant: 'label',
  typographyVariantNamespace: 'uiTypography',
  variantComposition: ['typography'],
  variantNamespace: 'uiLabel',
}

export const UILabel: FunctionComponent<PropsUILabel> = (props) => {
  const theme = useAppTheme()

  if (props.hidden) return null

  const propsVariant = theme.getPropsVariant(props, propsDefault)
  const styles = makeStyles(propsVariant, theme)

  return (
    <label
      className={cx(
        'ui-label',
        R.isString(propsVariant.variant) && `ui-label--${propsVariant.variant}`,
        propsVariant.className,
        styles.uiLabel,
      )}
      data-testid="view-ui-label"
      htmlFor={props.id}
    >
      {props.value}
    </label>
  )
}
